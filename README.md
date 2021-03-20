# Simple Form Exercise

![](https://user-images.githubusercontent.com/1670421/111800596-154bd600-8907-11eb-86ce-d2641059ccdf.png)

## Notes

## Testing Philosophy

> Write tests. Not too many. Mostly integration. - Guillermo Rauch‏ [(creator of Socket.io)](https://socket.io)

> The more your tests resemble the way your software is used, the more confidence they can give you. You really want to avoid testing implementation details because it doesn't give you very much confidence that your application is working and it slows you down when refactoring. Implementation details are things which users of your code will not typically use, see, or even know about. You should very rarely have to change tests when you refactor code. Integration tests strike a great balance on the trade-offs between confidence and speed/expense. This is why it's advisable to spend most (not all, mind you) of your effort there. - [Kent C Dodds](https://kentcdodds.com/blog/write-tests)

## Packages Used

My first intention was to use Ant Design but decided not to.
This is because Ant Design's form and modal as it's generating a warning (`Warning: findDOMNode is deprecated in StrictMode`) [see issue #2613 for more information](https://github.com/ant-design/ant-design/issues/26136) So I opted to use `Formik`, `yup`, and `@react/dialog` here.
