import { Provide } from '@midwayjs/decorator';
import { AddItem, UpdateItem } from '../proto/list';
import { putRow, updateRow, deleteRow, getList } from '../db/client';

@Provide()
export default class ListService {
  async list() {
    return await getList('list', 'list_index');
  }
  async add(params: AddItem) {
    return await putRow<AddItem>('list', {
      title: params.title,
      content: params.content,
    });
  }
  async del(id: string) {
    return await deleteRow('list', id);
  }
  async update(params: UpdateItem) {
    return await updateRow<Omit<UpdateItem, 'id'>>('list', params.id, {
      title: params.title,
      content: params.content,
    });
  }
}
