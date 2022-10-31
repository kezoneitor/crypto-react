import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import useSelectCoins from '../hooks/useSelectCoins'
import { coins } from '../data/coins'
import ErrorComponent from './Error'
const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`
const Form = ({ setCoins }) => {
  const [Cryptos, setCryptos] = useState([])
  const [Error, setError] = useState(false)

  const [Coin, SelectCoins] = useSelectCoins('Select Coin', coins)
  const [Crypto, SelectCryptoCoins] = useSelectCoins('Select Crypto Coin', Cryptos)

  useEffect(() => {
    const ApiGet = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD'
      const response = await fetch(url)
      const result = await response.json()
      const arrayCryptos = result.Data.map(crypto => {
        return { id: crypto.CoinInfo.Name, name: crypto.CoinInfo.FullName }
      })
      setCryptos(arrayCryptos)
    }
    ApiGet()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if ([Coin, Crypto].includes('')) {
      setError(true)
      return
    }
    setError(false)
    setCoins({
      Coin,
      Crypto
    })
  }

  return (
    <>
      {Error && <ErrorComponent>Todos los campos son necesarios</ErrorComponent>}
      <form action=""
        onSubmit={handleSubmit}
      >
        <SelectCoins />
        <SelectCryptoCoins />
        <InputSubmit
          type="submit"
          value="Cotizar"
        />
      </form>
    </>
  )
}

export default Form