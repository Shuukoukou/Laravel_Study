/**
 * @description 单词列表
 * @author 徐政 马昊晟
 * @date 2021-7-16
 */

import { List } from 'antd';
import {StarOutlined,CheckCircleOutlined, StarTwoTone,EyeOutlined,CheckCircleTwoTone,LikeTwoTone} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import {appContext} from '../App'
 
const WordItem = (props)=>{
    const {word,refetch} = props
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
        if(refetch) refetch()
    }

    const toggleFav = async ()=>{
        const nextState = word.fav && word.fav === 1 ? 0 : 1
        await word.update({
            $set:{
                fav:nextState
            }
        })
        setFav(nextState)
        if(refetch) refetch()
    }

    useEffect(()=>{
        setRemembered(word.remembered)
    },[word.remembered])

    useEffect(()=>{
        setFav(word.fav)
    },[word.fav])

    return (
        <List.Item actions={[
            <Link to={`/word/${word._id}`}><EyeOutlined/></Link>,
            remembered && remembered === 1
                ? <CheckCircleTwoTone onClick={toggleRemembered}/>
                : <CheckCircleOutlined onClick={toggleRemembered}/>,
            fav && fav === 1
                ? <StarTwoTone  twoToneColor={"orange"} onClick={toggleFav}/>
                : <StarOutlined onClick={toggleFav}/>]}
        >
                {word.tested===1?<LikeTwoTone twoToneColor="red"/>:null}{`${word.kanji}（${word.kana}）【${word.pos}】${word.sem}`}
        </List.Item>
    )
}

const WordList = (props)=>{
    const {words,refetch} = props
    return (
        <List
            size="small"
            bordered
            dataSource={words}
            renderItem={item => <WordItem word={item} refetch={refetch}/>}
        />
    )
}

export default WordList