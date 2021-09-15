import {
  Controller,
  Get,
  Post,
  Provide,
  ALL,
  Body,
  Inject,
} from '@midwayjs/decorator';
import ListService from '../service/list';
import { List, AddItem } from '../interface/list';

@Provide()
@Controller('/api/list')
export default class ListController {
  @Inject()
  listService: ListService;
  @Get('/')
  async list(): Promise<List[]> {
    return [
      {
        id: '1',
        content: '1',
        title: '1',
        create_date: '',
      },
    ];
  }
  @Post('/add')
  async add(@Body(ALL) item: AddItem) {
    return await this.listService.add(item);
  }
}
