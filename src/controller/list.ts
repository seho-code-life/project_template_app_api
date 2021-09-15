import {
  Controller,
  Get,
  Post,
  Provide,
  ALL,
  Body,
  Inject,
  Del,
  Query,
} from '@midwayjs/decorator';
import ListService from '../service/list';
import { List, AddItem } from '../interface/list';

@Provide()
@Controller('/v1/list')
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
  @Del('/')
  async del(@Query('id') id: number): Promise<string> {
    return 'hello';
  }
}
