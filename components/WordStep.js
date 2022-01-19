/**
 * @description 单词步骤条
 * @author 徐政 马昊晟
 * @date 2021-7-17
 */

import { Steps,Divider,Button,Space } from 'antd';
import {useEffect,useState,useContext} from 'react'
import {appContext} from '../App'
import WordCard from './WordCard'
import QuestionCard from './QuestionCard'
import {useParams} from 'react-router-dom'

const { Step } = Steps;

const WordStep = ()=>{
    const [words,setWords] = useState([])
    const [initial,setInitial] = useState(0)
    const [current,setCurrent] = useState(0)
    const [answers,setAnswers] = useState({})
    const [steps,setSteps] = useState([])
    const {db} = useContext(appContext)
    const {mode} = useParams()

    const loadSteps = ()=>{
        const ss = words.slice(Math.max(0,current-1),current+2).map((w,idx)=>(
            <Step key={idx}/>
        ))
        setSteps(ss)
    }

    const loadWords = async ()=>{
        const user = await db.users.findOne().exec()
        let arr = []
        if(mode==='remember'){
            await Promise.all(user.books.map(async (b)=>{
                const ws = await db.words.find().where("book").eq(b).where("remembered").eq(0).exec()
                arr = [...arr,...ws]
            }))
            const remain = Math.max(0,user.plan-user.today)
            arr = arr.slice(0,remain)
        }else if (mode==='review'){
            const ws = await db.words.find().where("fav").eq(1).exec()
            const remain = user.review
            arr = ws.slice(0,remain)
            setWords(arr)
        }else if(mode==='test'){
            await Promise.all(user.books.map(async (b)=>{
                const ws = await db.words.find().where("remembered").eq(1).where("tested").eq(0).exec()
                arr = [...arr,...ws]
            }))
            const remain = 10
            arr = arr.slice(0,remain)
        }
        setWords(arr)
    }

    const toLast = ()=>{
        setCurrent(Math.max(0,current - 1))
        setInitial(Math.max(0,current - 2))
    }

    const toNext = ()=>{
        setCurrent(Math.min(current + 1, words.length -1))
        setInitial(Math.min(current, words.length - 2))
    }

    useEffect(()=>{
        loadWords()
    },[])

    useEffect(()=>{
        loadSteps()
    },[words, current])

    if(words.length<1) return null

    return (
        <>
            <Steps current={current} initial={initial}>
                {steps}
            </Steps>
            <Divider/>
            {mode === 'test'
             ? <QuestionCard words={words} answers={answers} setAnswers={setAnswers} current={current}/>
             : <WordCard word={words[current]}/>}
            <Divider/>
            <Space>
                {current > 0
                 ? <Button size="large" onClick={toLast}>上一个</Button>
                 : null}
                {current < words.length - 1
                 ?<Button size="large" onClick={toNext}>下一个</Button>
                 : null}
            </Space>
        </>
    )
}

export default WordStep