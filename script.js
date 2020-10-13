var i=0;
var obj = {};
obj.variantNames = [];
obj.variantsValues = [];





function addVariant() {

    document.getElementById("done").innerText = "Update Variant Cost";

    var master = document.createElement("div");

    var mdiv = document.createElement("div");
    mdiv.classList.add("form-group");

    var mlabel = document.createElement("label");
    mlabel.setAttribute("for","variantName"+i);
    mlabel.innerText = "Variant-("+i+") Name";
    
    var minput = document.createElement("input");
    minput.setAttribute("type","text");
    minput.classList.add("form-control");
    minput.setAttribute("id","variantName"+i);

    mdiv.appendChild(mlabel);
    mdiv.appendChild(minput);

    var mdiv2 = document.createElement("div");
    mdiv2.classList.add("form-group");

    var mlabel2 = document.createElement("label");
    mlabel2.setAttribute("for","variantValues"+i);
    mlabel2.innerText = "Variant-("+i+") Values (Comma Seperated)";
    
    var minput2 = document.createElement("input");
    minput2.setAttribute("type","text");
    minput2.classList.add("form-control");
    minput2.setAttribute("id","variantValues"+i);

    mdiv2.appendChild(mlabel2);
    mdiv2.appendChild(minput2);

    master.appendChild(mdiv);
    master.appendChild(mdiv2);

    document.getElementById("part2").appendChild(master);

    i = i + 1;
};


function updateVariant() {

    obj.prodName = document.getElementById("prodName").value;
    obj.prodDesc = document.getElementById("prodDesc").value;
    obj.prodBasePrice = document.getElementById("prodBasePrice").value;
    
    if(i>0){
        for(x=0;x<i;x++){
            obj[document.getElementById("variantName"+x).value] = document.getElementById("variantValues"+x).value.split(",");
            obj.variantNames.push(document.getElementById("variantName"+x).value);
        }
    }

    //console.log(prodName,prodBasePrice,prodDesc,variantNames,variantsValues);
    console.log(obj);
    
    document.getElementById("htitle").innerText = "Update Product";
    document.getElementById("part1").style.display = "none";

    var variantPricingDiv = document.getElementById("part3");
    variantPricingDiv.style.display = "block";

    for(x=0;x<obj.variantNames.length;x++){
        var vName = obj.variantNames[x];
        var vVals = obj[vName];

        obj[vName+"Costs"] = [];

        var h2blk = document.createElement("h2");
        h2blk.innerText = vName+ " " +"Pricings";
        variantPricingDiv.appendChild(h2blk);
        variantPricingDiv.appendChild(document.createElement("br"));

        for(y=0;y<vVals.length;y++){

            var ldiv = document.createElement("div");
            ldiv.classList.add("col-6");


            var mlabel = document.createElement("label");
            mlabel.setAttribute("for","variantName"+i);
            mlabel.innerText = vVals[y];

            ldiv.appendChild(mlabel);
            
            var rdiv = document.createElement("div");
            rdiv.classList.add("col-6");
        
            var minput = document.createElement("input");
            minput.setAttribute("type","text");
            minput.classList.add("form-control");
            minput.setAttribute("id",vVals[y]+"Cost");
            
            rdiv.appendChild(minput);

            var row = document.createElement("div");
            row.classList.add("row");
            row.classList.add("form-group")
            
            row.appendChild(ldiv);
            row.appendChild(rdiv);

            variantPricingDiv.appendChild(row);
            variantPricingDiv.classList.add("spad");

        }

        variantPricingDiv.appendChild(document.createElement("br"));
    }

    var okbtn = document.createElement("button");
    okbtn.classList.add("btn");
    okbtn.classList.add("btn-primary");
    okbtn.classList.add("black");
    okbtn.setAttribute("onclick","okay()")
    okbtn.setAttribute("id","okay");
    okbtn.innerText = "Done";

    variantPricingDiv.appendChild(okbtn);

}


function okay(){

    document.getElementById("htitle").innerText = "View Product";

    document.getElementById("part3").style.display = "none";
    document.getElementById("part4").style.display = "block";

    document.getElementById("pName").innerText = obj.prodName;
    document.getElementById("pDesc").innerText = obj.prodDesc;
    document.getElementById("bPrice").innerText = obj.prodBasePrice;

    for(x=0;x<obj.variantNames.length;x++){
        var vName = obj.variantNames[x];
        var vVals = obj[vName];

        var mdiv = document.createElement("div");
        mdiv.classList.add("form-group");

        var mlabel = document.createElement("label");
        mlabel.setAttribute("for","select"+vName);
        mlabel.innerText = " Select " + vName;

        var mselect = document.createElement("select");
        mselect.classList.add("form-control");
        mselect.setAttribute("id","select"+vName);
        mselect.setAttribute("onchange","computeCost()");
        var loption = document.createElement("option");
        loption.setAttribute("value","0");
        loption.innerText ="Select";
        mselect.appendChild(loption);


        for(y=0;y<vVals.length;y++){
            console.log(document.getElementById(vVals[y]+"Cost").value);
            obj[vName+"Costs"].push(document.getElementById(vVals[y]+"Cost").value);

            var moption = document.createElement("option");
            moption.setAttribute("value",document.getElementById(vVals[y]+"Cost").value);
            moption.innerText = vVals[y];
            mselect.appendChild(moption);
           
        }
        mdiv.appendChild(mlabel);
        mdiv.appendChild(mselect);

        document.getElementById("selections").appendChild(mdiv);

    }

    console.log(obj);
}


function computeCost(){
    var cost = Number(obj.prodBasePrice);

    for(x=0;x<obj.variantNames.length;x++){
        var vName = obj.variantNames[x];
        console.log("Selected m Price is :",document.getElementById("select"+vName).value)
        cost = cost + Number(document.getElementById("select"+vName).value);
    }

    document.getElementById("totPrice").innerText = cost;
}
