import { useContractRead } from '@starknet-react/core'
import { GAMEADDRESS } from '../constants/addresses'
import gameContract from '../constants/nogame.json'
import { type Position } from '../shared/types'

export function useGetPositionsArray (): Position[] | undefined {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: 'get_generated_planets_positions',
    args: []
  })
  return data as Position[]
}
