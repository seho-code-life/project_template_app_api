import { Provide } from '@midwayjs/decorator';
import { AddItem } from '../interface/list';

@Provide()
export default class ListService {
  async add(params: AddItem) {
    console.log('嗯好的', params);
  }
}
