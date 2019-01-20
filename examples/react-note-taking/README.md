This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This little project is just an **use case of the combinations ```rhelena + manuh```.

```rhelena``` is used to attach *model* to *view* so that attributes defined in *model* before exiting its ```constructor``` **can be accessed by *view* through its **state.

Additionally, every modification on those attributes defined *before* exiting the constructor are noticed by the correspondent *view* and its change **does not** trigger an ```setState``` call.

That's the role of ```rhelena;``` now, time to ```manuh```'s role in the bigger picture.

The ```manuh```'s role on the application is to enable communication between two components of software satisfying some quite important requirements:

+ be fast

+ easy to use

+ efficient

  

  ```manuh``` is *fast and efficient* as you can see at the 

  [official project's page]: https://github.com/tiagostutz/manuh

  and is *easy to use* as you can see by looking into [EditorModel](src/model/EditorModel.js) and [EditableListModel](src/model/EditableListModel.js): the *first* has a method of name ```addItem```, while in the *second* you have a *subscription* to a **channel**, which is **notes/add**.

  The ```addItem``` method when called **publishes**  to the **notes/add** channel.

  When the publish is done, the **subscribers** of this channel realize that something new was sent through the channel. In this case, any instance of ```EditableList``` would be subscribers to the same **notes/add** channel.

After noticed the publish, the *callback* of

```js
    manuh.subscribe(`notes/add`, this.id, (txt, info) => {
      console.log('OK! Editor received text... ==> ',txt);
      this.items.push({
        value: txt,
        tags: [txt.split("").reverse().join("")]
      });
      this.items = this.items;
    })
```

is executed.

The same mechanics apply to the other two uses of ```manuh``` present in this simple  note-taking application.