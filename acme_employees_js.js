const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];


const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }

function findEmployeeByName(employeeName, array) {
  for (let i=0;i<array.length;i++) {
    if (array[i].name === employeeName) {
      return array[i];
    }
  }

 }

spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }

function findManagerFor(employee1, array) {

  let idToFind = employee1.managerId;


   for (let i=0;i<array.length;i++) {
    if (array[i].id === idToFind) {
      return array[i];
    }
  }
}


spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

function findCoworkersFor(employee1, array) {
let coworkers = [];

let manager = findManagerFor(employee1, array);

let managerID = manager.id;


 for (let i=0;i<array.length;i++) {
    if (array[i].managerId === managerID && array[i].id !== employee1.id) {
      coworkers.push(array[i]);
    }
  }


  return coworkers;


}

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/



function findManagementChainForEmployee(employee1, array) {
  //create new managerChain array to return
  let managerChain = [];


  if (findManagerFor(employee1, array) === undefined) {
    return managerChain;
  }

  //console.log to check the employee1 data in argument
  //console.log("employee1 = ", employee1);

  //create currentEmployee variable
 //save current employee object to currentEmployee variable
    let currentEmployee = employee1;

  //use findmanager on current employee variable to find manager for current employee
   manager = findManagerFor(currentEmployee, array);

  //use .unshift on manager to push managerChain array to the start of the array
  managerChain.unshift(manager);


  //set currentEmployee to manager
  currentEmployee = manager;

//while the currentEmployee has a manager ID
//loop add the manager to the array
while(currentEmployee.managerId !== undefined) {
   manager = findManagerFor(currentEmployee, array);

  //use .unshift on manager to push managerChain array to the start of the array
  managerChain.unshift(manager);


  //set currentEmployee to manager
  currentEmployee = manager;

}

  //return managerChain array
  return managerChain

}


spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
