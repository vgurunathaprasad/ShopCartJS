var numOfVar = 0;
var obj = {};

function addvarient() {
    numOfVar += 1;
    obj.name = document.getElementById('pname').value;
    obj.price = parseInt(document.getElementById('price').value);
    obj.des = document.getElementById('des').value;
    var divElem = document.getElementById('varients');
    var newdiv = document.createElement('div');
    var inp1 = document.createElement('input');
    inp1.id = 'type' + numOfVar;
    inp1.className = 'form-control';
    inp1.placeholder = 'Varient Type ' + numOfVar;
    var inp2 = document.createElement('input');
    inp2.id = 'value' + numOfVar;
    inp2.className = 'form-control';
    inp2.placeholder = 'Varient Values(Type ' + numOfVar + ')';
    newdiv.appendChild(inp1);
    newdiv.appendChild(document.createElement('br'));
    newdiv.appendChild(inp2);
    newdiv.className = 'form-group';
    divElem.insertBefore(newdiv, divElem.childNodes[numOfVar]);
    divElem.style.display = 'block';
}

function createVarDetails() {
    var varients = [];
    var varientDetails = [];
    var size = 1;
    for (var itr = 0; itr < numOfVar; itr++) {
        var tempObj = {}
        tempObj.type = document.getElementById('type' + (itr + 1)).value;
        tempObj.values = document.getElementById('value' + (itr + 1)).value.split(',');
        size = size * tempObj.values.length;
        varients.push(tempObj);
    }
    obj.varients = varients;
    var temp = 1;
    for (var i = 0; i < varients.length; i++) {
        temp = temp * varients[i].values.length;
        var ind = 0;
        for (var j = 0; j < size; j++) {
            if (j % (size / temp) == 0) {
                ind = ind + 1;
                if (ind == varients[i].values.length) {
                    ind = 0;
                }
            }
            if (varientDetails[j] === undefined) {
                var tempObj = {};
                tempObj[varients[i].type] = varients[i].values[ind];
                varientDetails.push(tempObj);
            } else {
                varientDetails[j][varients[i].type] = varients[i].values[ind];
            }
        }
    }
    obj.varientDetails = varientDetails;
    document.getElementById('varientdetails').remove();
    var newDiv = document.createElement('div');
    newDiv.id = 'varientdetails';
    var key = Object.keys(obj.varientDetails[0]);
    for (var i = 0; i < size; i++) {
        var inDiv = document.createElement('div');
        var lab = document.createElement('label');
        lab.setAttribute('for', 'val' + (i + 1));
        var inp1 = document.createElement('input');
        inp1.name = 'val' + (i + 1);
        inp1.id = 'val' + (i + 1);
        inp1.value = 0;
        inp1.className = 'form-control';
        for (var j = 0; j < key.length; j++) {
            if (j == 0) {
                lab.innerHTML = obj.varientDetails[i][key[j]];
            } else {
                lab.innerHTML = lab.innerHTML + '/' + obj.varientDetails[i][key[j]];
            }
        }
        inDiv.appendChild(lab);
        inDiv.appendChild(inp1);
        newDiv.appendChild(inDiv);
    }
    var donebtn = document.createElement('input');
    donebtn.type = 'button';
    donebtn.className = 'btn btn-primary';
    donebtn.value = 'Set Add On Price';
    donebtn.setAttribute('onclick', 'setAddOnPrice()');
    newDiv.appendChild(donebtn);
    document.getElementById('submitbtn').parentNode.insertBefore(newDiv, document.getElementById('submitbtn'));
}

function setAddOnPrice() {
    for (var ind = 0; ind < obj.varientDetails.length; ind++) {
        obj.varientDetails[ind].addOnPrice = parseInt(document.getElementById('val' + (ind + 1)).value);
    }
}

function consolePrint() {
    console.log(obj);
}