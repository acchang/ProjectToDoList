// this won't work:
// https://stackoverflow.com/questions/66575984/using-modules-and-webpack-for-js-project-why-am-i-getting-an-uncaught-referenc?noredirect=1#comment117711277_66575984
// . The whole point of using JS modules and Webpack is to avoid global variables. Programs are much easier to understand 
// and maintain when the dependency chain is explicitly established by import chains. 


function establishArrays() {

    let globalVar = (function () {
        let projectList = [];
        return {
            projectList: projectList
        };
    }());
    console.log(globalVar.projectList)
    // this works
};

export default establishArrays;

// globalVar.projectList
// []

// IS THERE A WAY TO REDUCE THIS TO A SINGLE VARIABLE?

// cannot substitute
// function globalVar() {
//     let projectList = [];
//     return {
//         projectList: projectList
//     };
// };


// from: https://medium.com/@petertumulty/avoiding-the-global-scope-with-the-revealing-module-pattern-6796ae7af1b9