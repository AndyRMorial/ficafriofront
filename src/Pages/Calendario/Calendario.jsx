import React from 'react'
import './Calendario.scss'
import CalendarioComp from '../../Components/CalendarioComp/CalendarioComp';
import { initData } from '../../Components/actions/initData';


const Calendario = () => {
  return (
    <div>
      <CalendarioComp events={initData.quadro[0].colunas[0].cards} />
    </div>
  )
}

export default Calendario