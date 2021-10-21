# my_midway_project

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

### 数据库 OTS

需要在 src/db 下新建 config.ts 文件，内容如下:

```js
export default {
  accessKeyId: '', // 阿里云的key
  accessKeySecret: '', // 阿里云的Secret
  endpoint: '', // 数据库外网地址
  instancename: '', // ots实例名
};
```

[midway]: https://midwayjs.org
