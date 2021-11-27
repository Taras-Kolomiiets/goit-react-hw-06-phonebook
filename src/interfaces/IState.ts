import IItem from './IItem'

export default interface IState {
  filter: string,
  items: IItem[] | []
}