/**
 * @description 返回上一页按钮
 * @author 徐政 马昊晟
 * @date 2021-7-19
 */

import {RollbackOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import {Button} from 'antd'

const ReturnBackButton = ()=>{
    const navigate = useNavigate()

    const returnBack = ()=>{
        navigate(-1)
    }

    return (
        <Button size="large" shape="circle" icon={<RollbackOutlined/>} onClick={returnBack}/>
    )
}

export default ReturnBackButton