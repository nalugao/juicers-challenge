import '../style/cardPainel.css'

export default function CardPainel(props) {
    return (
        <div className="card_painel">
            <img src={props.icone} alt={props.alt} />
            <p className='texto_estatistica'>{props.estatistica}</p>
            <p className='texto_descricao'>{props.descricao}</p>
        </div>
    )
}