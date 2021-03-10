
function establishArrays() {

    let globalVar = (function () {
        let projectList = [];
        return {
            projectList: projectList
        };
    }());

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