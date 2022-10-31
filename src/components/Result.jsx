import React from 'react'
import styled from '@emotion/styled'

const ResultStyle = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
`
const Image = styled.img`
    display: block;
    width: 120px;
`
const Text = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`
const Price = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`

const Result = ({ ResultValue }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = ResultValue
    return (
        <ResultStyle>
            <Image
                src={`https://cryptocompare.com/${IMAGEURL}`}
                alt='Crypto image'
            />
            <div>
                <Price>El Precio es de: <span>{PRICE}</span></Price>
                <Text>Precio más alto del día: <span>{HIGHDAY}</span></Text>
                <Text>Precio más bajo del día: <span>{LOWDAY}</span></Text>
                <Text>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Text>
                <Text>Última Actualización: <span>{LASTUPDATE}</span></Text>
            </div>
        </ResultStyle>
    )
}

export default Result