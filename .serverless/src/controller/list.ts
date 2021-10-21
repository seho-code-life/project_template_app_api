import {
  Controller,
  Get,
  Post,
  Provide,
  ALL,
  Body,
  Inject,
  Del,
  Put,
} from '@midwayjs/decorator';
import ListService from '../service/list';
import { AddItem, UpdateItem } from '../proto/list';

@Provide()
@Controller('/v1/list')
export default class ListController {
  @Inject()
  listService: ListService;
  @Get('/')
  async list() {
    return await this.listService.list();
  }
  @Post('/')
  async add(@Body(ALL) item: AddItem) {
    return await this.listService.add(item);
  }
  @Del('/')
  async del(@Body('id') id: string) {
    return await this.listService.del(id);
  }
  @Put('/')
  async update(@Body(ALL) item: UpdateItem) {
    return await this.listService.update(item);
  }
}
