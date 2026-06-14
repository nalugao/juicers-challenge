import '../style/cardInsight.css'

export default function CardInsight(props) {

    return(
        <div className="card_insight">
            <p className='texto_titulo'>{props.titulo}</p>
            <p className='texto_descricao'>{props.descricao}</p>
        </div>
    )
}