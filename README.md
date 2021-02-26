# simple-eventBus
> It's a simple eventBus



## API

### $on
注册事件
#### 类型
```js

(event: string | Array<string>, fn: Function) => Instance;

```

#### 参数

| 参数   | 类型  |        说明             |
|------- | ----- |------------------------ |
| event  | string / Array<string>    | 要注册的事件名称(单个事件)或事件名称数组(多个事件)|
| fn | Function | 事件处理函数,可接收任意参数|

##### 使用
```js

import Bus from 'xxx/bus'

Bus.$on('eventName',(a,b,c)=> {...})

```


### $once

注册只能触发一次的事件
#### 类型
```js

(event: string, fn: Function) => Instance;

```

#### 参数

| 参数   | 类型  |        说明             |
|------- | ----- |------------------------ |
| event  | string | 要注册的事件名称|
| fn | Function | 事件处理函数,可接收任意参数|

##### 使用
```js

import Bus from 'xxx/bus'

Bus.$once('eventName',(a,b,c)=> {...})

```

### $off

注销事件
#### 类型
```js

(event: string | Array<string>, fn?: Function) => Instance;

```

#### 参数

| 参数   | 类型  |        说明             |
|------- | ----- |------------------------ |
| event  | string | 要注销的事件名称,可以单个,也可以批量(数组)|
| fn | Function | 可选参数,事件处理函数(和注册事件时候的处理函数为同一个)|

##### 使用
```js
// common.js
const func = (a,b,c)=> {
    ...
}

// -------------compA--------

import Bus from 'xxx/bus'

// 单个事件
Bus.$on('eventName',func)

//多个事件
Bus.$on(['eventName1','eventName2',...],func)


// -------------compB--------

import Bus from 'xxx/bus'

// 单个
Bus.$off('eventName')

或者

Bus.$off('eventName',func)

// 多个

Bus.$off(['eventName1','eventName2',...])

或者

Bus.$off(['eventName1','eventName2',...],func)

```


### $emit

触发事件
#### 类型
```js

(event: string, ...args: Array<any>) => Instance;

```

#### 参数

| 参数   | 类型  |        说明             |
|------- | ----- |------------------------ |
| event  | string   | 要触发的事件名(已注册的事件名)|
| args | Array<any> | 事件参数 |

##### 使用
```js

import Bus from 'xxx/bus'

Bus.$emit('eventName',arg1,arg2,ar3,...)

```






