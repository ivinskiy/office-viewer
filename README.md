# 3D model office viewer

Welcome to my 3D model office viewer! It's made in ThreeJS, React Fiber Three and TailwindCSS for styling.
The url to the deployed application: https://regal-biscochitos-3dc186.netlify.app/

## Getting started

Clone this repository, and then run the commands npm install and npm run dev.

## User instructions

Here you are able to view, place and adjust models of a open-sourced model in an office environment. There is a directional light and a point light already in the scene in order to provide some basic lightning. Feel free to move it around.

In order to place an item into the scene, click the button "Place items" and select an item from the menu you wish to place.
Afterwards, it is possible to select the model or light to adjust different settings in the menu to the left, and move it around using the transform controls.

You are also able to delete the object using the delete button in the menu to the right.

## Limitations

You can only place out a box model, a custom model and two types of lights into the scene.
Properties properties are only adjusteable via the transform controls, with the exception of scale.
You can also only select one object at a time, and there is no collision between walls and objects, meaning that you can place objects inside the walls.

## Future work (suggestions)

- Enable more properties to be editeable via the menu to the left.
- Add collision to the walls.
- Add more different types of models.
- Create a drag and drop menu instead of just clicking (similarly as it is now here https://design.ui.com/)
- Better mobile experience
- Add more tests
