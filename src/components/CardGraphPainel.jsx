import '../style/cardGraphPainel.css'

export default function CardGraphPainel(props) {
    return (
        <div className="card_painel">
            <p className='texto_descricao'>
                {props.descricao}
            </p>
            
            {props.link && props.fonteNome && (
                <div className="container_fonte">
                    <a href={props.link} target="_blank" rel="noreferrer" className="link_fonte">
                        Fonte: {props.fonteNome}
                    </a>
                </div>
            )}
        </div>
    )
}