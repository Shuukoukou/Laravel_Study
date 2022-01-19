/**
 * @description 问题卡片
 * @author 徐政 马昊晟
 * @date 2021-7-16
 */

import {Typography,Input,Button,message,Divider,Row,Col,Image} from 'antd' 
import {useState,useEffect} from 'react'
import WordCard from './WordCard'
import ReturnBackButton from './ReturnBackButton'

const {Title} = Typography

const QuestionCard = (props)=>{
    const {words,answers,setAnswers,current} = props
    const [word,setWord] = useState({})
    const [answer,setAnswer] = useState(null)

    const handleChange = (e)=>{
        setAnswer(e.target.value.trim())
    }

    const submit = async ()=>{
        if(!answer || answer.trim() === '') {
            message.warning("请输入答案")
            return
        }
        if(answer.trim() === word.kana){
            await word.update({
                $set:{
                    tested:1
                }
            })
        }
        setAnswers({...answers,[current]:answer.trim()})
    }

    useEffect(()=>{
        setAnswer(answers[current])
        setWord(words[current])
    },[current])

    return (
        <>
            <Title>
                <Row justify="space-between">
                    <Col>
                        {`【${word.pos}】${word.kanji}`}
                    </Col>
                    <Col>
                        <ReturnBackButton/>
                    </Col>
                </Row>
            </Title>
            <Input size="large" placeholder="请输入该单词的假名读音" 
                value={answer} onChange={handleChange} disabled={answers[current]}/>
            {answers[current] 
                ? null : <Button size="large" onClick={submit} style={{marginTop:20}}>提交</Button>}
            {answers[current] 
                ? (<>
                    <Divider/>
                    <Row gutter={[10,10]}>
                        <Col sm={8}>
                            <Image preview={false} width="100%" src={`./icon/${words[current].kana===answers[current] ? "correct" : "wrong"}.png`}/>
                        </Col>
                        <Col sm={16}>
                            <WordCard word={words[current]}/>
                        </Col>
                    </Row>
                    </>) : null}
        </>
    )
}

export default QuestionCard