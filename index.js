
// command for project to run 
// node fileName caseName like organize , tree and help than path name like "F:\event"


// **************command: node index.js organize "F:/event"****************

// process.argv[2]   used for take input from the commandline
let fs = require('fs')
let path = require('path')

let inputArr= process.argv.slice(2); 
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    image:['png','gif','jpg','jpeg','jfif','pjpeg','pjp','svg','PNG','JPG'],
    python:['py'],
    java:['java'],
    rprogram:['R'],
    javascript:['js'],
    html:['html'],
    css:['css','scss'],
    C_or_Cpp:['c','cpp']
}
console.log(inputArr)

// node main.js tree "directoryPath"
//node main.js organize "directoryPath"
// node main.js help 

let command = inputArr[0]; 
console.log(command) 
console.log(inputArr[1])

switch(command)
{
    case "tree":TreeFn(inputArr[1])
        break;
    case "organize":OrganizeFn(inputArr[1])
        break;
    case "help": HelpFn()
        break;
        default:
            console.log("🙏 Please Input Right command ");
            break;

}

function TreeFn(dirPath)
{
    //console.log("tree command implemented for ",dirPath)
     // console.log("OrganizeFn command implemented for ",dirPath)
    // input->directory path name
    //let destPath;
    if(dirPath==undefined)
    {
        
        treeHelper(process.cwd() ,"");
        return
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist)
        {  
          treeHelper(dirPath ,"");

        }else{
            console.log("kindly enter the right path")
            return  
        }
    }
}

//,indent
    function  treeHelper(dirPath,indent)  
    {
        let isFile=fs.lstatSync(dirPath).isFile();

        if(isFile==true)
        {
            let fileName=path.basename(dirPath)
            // console.log("sant-----> "+ dirPath+"  hello path  "  +fileName)
            // indent +
            console.log(indent+"|----"+ fileName)
            // OrganizeFn(dirPath)
        }
        else
        {
            let dirName=path.basename(dirPath)
            // indent + 
            console.log(indent+"!-----"+dirName) 
            let childrens = fs.readdirSync(dirPath)
            for (let i=0;i<childrens.length;i++)
            { 
                let childPath=path.join(dirPath,childrens[i])
                // indent+ 
                // OrganizeFn(childPath)
                treeHelper(childPath,indent+ "\t")

            }
        }
    }


function OrganizeFn(dirPath)
{
    // console.log("OrganizeFn command implemented for ",dirPath)
    // input->directory path name
    let destPath;
    if(dirPath==undefined)
    {
        // console.log("kindly enter the right path")
        destPath=process.cwd()

        return
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist)
        {  
            //2. create - organize file folder
            destPath= path.join(dirPath,"organized_files");
           if(fs.existsSync(destPath)==false)
           fs.mkdirSync(destPath);

        }else{
            console.log("kindly enter the right path")
            return  
        }
    }
  organizeHelper(dirPath,destPath)
}

function organizeHelper(src,des)
{
    //3.identify categories of all files present in that input directory

   let childnames= fs.readdirSync(src)
//    console.log(childnames)
   for (let i=0;i<childnames.length;i++)
   {
   let childAddress= path.join(src,childnames[i])
   let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile)
    {
        // console.log(childnames[i])
        let category = getCategory(childnames[i])
        console.log(category)

        sendFiles(childAddress,des,category)
    }
   }
}

function sendFiles(src,des,category)
{
    let categoryPath=path.join(des,category)

    if(fs.existsSync(categoryPath)==false)
    {
        fs.mkdirSync(categoryPath)
    }
    let  filename=path.basename(src)

    let destFilePath = path.join(categoryPath,filename)
    fs.copyFileSync(src,destFilePath)
   fs.unlinkSync(src)
    console.log(filename," copied to ",category)

}
 
function getCategory(name)
{
let ext=path.extname(name)
ext=ext.slice(1)
// console.log(ext)
for(let type in types)
{  
    // console.log("types",type)
    let cTypeArray = types[type]
    for(let i=0;i<cTypeArray.length;i++)
    {  // console.log( "exten" ,ext,"types",cTypeArray[i])
        if (ext ==cTypeArray[i])
        {
            return type
        }
    }
}
return "others"
}



function HelpFn()
{
    console.log(`Help command implemented for ",dirPath:
     node main.js tree "directoryPath"
node main.js organize "directoryPath"
 node main.js help 
    
    `)
}


