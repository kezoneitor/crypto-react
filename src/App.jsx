import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import cryptoImage from './assets/img/imagen-criptos.png'
import Form from './components/Form'
import ResultComponent from './components/Result'
import Spinner from './components/Spinner'

const Container = styled.div`
  max-width:900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`
const Heading = styled.h1`
  color: #FFF;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  text-align: center;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {
  const [Coins, setCoins] = useState({})
  const [Result, setResult] = useState({})
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    if (Object.keys(Coins).length > 0) {
      const getCrypto = async () => {
        setLoading(true)
        setResult({})

        const { Coin, Crypto } = Coins
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Crypto}&tsyms=${Coin}`

        const response = await fetch(url)
        const result = await response.json()
        setResult(result.DISPLAY[Crypto][Coin])
        setLoading(false)
      }
      getCrypto()
    }
  }, [Coins])

  return (
    <Container>
      <Image src={cryptoImage} alt='Crypto Image' />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form
          setCoins={setCoins}
        />
        {Loading && <Spinner />}
        {Result.PRICE && <ResultComponent ResultValue={Result} /> }
      </div>
    </Container>
  )
}

export default App
