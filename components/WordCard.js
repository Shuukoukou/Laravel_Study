/**
 * @description 单词卡片
 * @author 徐政 马昊晟
 * @date 2021-7-16
 */

import {Card,Typography,Row,Col,Button} from 'antd' 
import {StarTwoTone,CheckCircleTwoTone,StarOutlined,CheckCircleOutlined,LikeTwoTone} from '@ant-design/icons'
import {useState,useEffect,useContext} from 'react'
import {appContext} from '../App'
import ReturnBackButton from './ReturnBackButton'

const {Title} = Typography

const WordCard = (props)=>{
    const {word} = props
    const {db} = useContext(appContext)
    const [remembered,setRemembered] = useState(word.remembered)
    const [fav,setFav] = useState(word.fav)

    const toggleRemembered = async ()=>{
        const user = await db.users.findOne().exec()
        const nextState = word.remembered && word.remembered === 1 ? 0 : 1
        await word.update({
            $set:{
                remembered:nextState
            }
        })
        if(nextState===1){
            await user.update({
                $set:{
                    today:user.today + 1
                }
            })
        }else{
            await user.update({
                $set:{
                    today:Math.max(0,user.today - 1)
                }
            })
            await word.update({
                $set:{
                    tested:0
                }
            })
        }
        setRemembered(nextState)
    }

    const toggleFav = async ()=>{
        const nextState = word.fav && word.fav === 1 ? 0 : 1
        await word.update({
            $set:{
                fav:nextState
            }
        })
        setFav(nextState)
    }

    useEffect(()=>{
        setRemembered(word.remembered)
    },[word.remembered])

    useEffect(()=>{
        setFav(word.fav)
    },[word.fav])

    return (
        <Card title={
            <Title>
                <Row justify="space-between">
                    <Col>
                        {word.tested===1?<LikeTwoTone twoToneColor="red"/>:null}
                        {`${word.kanji}`}
                    </Col>
                    <Col>
                        <ReturnBackButton/>
                    </Col>
                </Row>
            </Title>
        } actions={[remembered && remembered === 1
                ? <Button size="large" type="text" icon={<CheckCircleTwoTone />} onClick={toggleRemembered}>我又忘了</Button>
                : <Button size="large" type="text" icon={<CheckCircleOutlined />} onClick={toggleRemembered}>我记住了</Button>,
                fav && fav === 1
                ? <Button size="large" type="text" icon={<StarTwoTone twoToneColor={"orange"}/>}  onClick={toggleFav}>取消收藏</Button>
                : <Button size="large" type="text" icon={<StarOutlined />} onClick={toggleFav}>加入单词本</Button>
            ]}>
            {word.audio ?
                <audio src={`./audio/${word.audio}`} controls>
                    您的浏览器不支持 audio 标签。
                </audio>
                : null}
            <Title level={3}>{`${word.kana}`}</Title>
            <Title level={3}>{`【${word.pos}】${word.sem}`}</Title>
            {word.ex ?
                <Title level={4}>{`Ex.${word.ex}`}</Title> : null}
        </Card>
    )
}

export default WordCard