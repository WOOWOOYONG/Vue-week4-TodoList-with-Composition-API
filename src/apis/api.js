import request from './request.js'

// 使用者註冊
const signUp = (newUser) => request.post(`/users`, newUser)

// 使用者登入
const logIn = (user) => request.post(`/users/sign_in`, user)

// 使用者登出
const logOut = (config) => request.delete(`/users/sign_out`, config)

// 取得待辦事項
const getTodo = (config) => request.get(`/todos`, config)

// 新增待辦事項
const addTodo = (todo, config) => request.post(`/todos`, todo, config)

// 刪除待辦事項
const delTodo = (todoId, config) => request.delete(`/todos/${todoId}`, config)

// 更改待辦事項完成狀態
const toggleTodo = (todoId, config) => request.patch(`/todos/${todoId}/toggle`, {}, config)

export { signUp, logIn, logOut, getTodo, addTodo, delTodo, toggleTodo }
