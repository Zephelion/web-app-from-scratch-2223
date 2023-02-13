var sentence = "Russell Numo"
const codeblock = document.querySelector(".sentence");
const sentenceCurrent = document.querySelector(".sentence");
const id = "cldex18yd47ta0bw5jbmhatd6";


const fetchStudent = async (id) => {
    const url = `https://whois.fdnd.nl/api/v1/member?id=${id}`;

    console.log(url);

    await fetch(url)
    .then((response) => response.json())
    .then(async function(data) {
        console.log(data);
        sentence = `const student = {firstname: ${data.member.name}, lastname: ${data.member.surname}, nickname: ${data.member.nickname}, github: ${data.member.gitHubHandle} Discipline: CMD, role: Student,}`;
        
        await new Promise(r => setTimeout(r, 3000));
        codeblock.classList.add("codeblock");
        typeSentence(".sentence");
    });

};

async function typeSentence(element){
    const letters = sentence.split("");

    console.log(letters);

    for(i = 0; i < letters.length; i++){
        document.querySelector(element).innerHTML += letters[i] + "";
        
        await new Promise(r => setTimeout(r, 100));
    }

    if(i = 11){
       await new Promise(r => setTimeout(r, 4000));
        await removeSentence(".sentence");

        await fetchStudent(id);
        // sentence = "const student = {firstname: Russell, lastname: Numo, Discipline: CMD, role: Student,}";

        // await new Promise(r => setTimeout(r, 3000));
        // codeblock.classList.add("codeblock");
        // typeSentence(".sentence");

    }
}

async function removeSentence(element){
    const letters = sentence.split("");

    
    for(i = 0; i < sentence.length; i++){
        await new Promise(r => setTimeout(r, 100));
        letters.pop();
        document.querySelector(element).innerHTML = letters.join("");

    }
}


typeSentence(".sentence");