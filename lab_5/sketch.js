//member data
var members = [
  {
    name: "Joicihiro Fujiwara (藤原丈一郎)",
    colour: "Member colour: blue ",
    memberColour: "blue",
    text: "February 8 1996, Osaka, Japan",
    image: "jo.jpg"
  },
  {
    name: "Daigo Nishihata (西畑大吾)",
    colour: "Member colour: red",
    memberColour: "red",
    text: "January 9 1997, Osaka, Japan",
    image: "daigo.jpg"
  },
  {
    name: "Kazuya Ohashi (大橋和也)",
    colour: "Member colour: green",
    memberColour: "green",
    text: "August 9 1997, Fukuoka, Japan",
    image: "kazuya.jpg"
  },
  {
    name: "Kyohei Takahashi (高橋恭平)",
    colour: "Member colour: purple",
    memberColour: "purple",
    text: "February 28 2000, Osaka, Japan",
    image: "kyohei.jpg"
  },
  {
    name: "Ryusei Onishi (大西流星)",
    colour: "Member colour: orange",
    memberColour: "orange",
    text: "August 7 2001, Hyogo, Japan",
    image: "ryusei.jpg"
  },
  {
    name: "Shunsuke Michieda (道枝駿佑)",
    colour: "Member colour: pink",
    memberColour: "pink",
    text: "July 25 2002, Osaka, Japan",
    image: "micchi.jpg"
  },
  {
    name: "Kento Nagao (長尾謙杜)",
    colour: "Member colour: yellow",
    memberColour: "yellow",
    text: "August 15 2002, Osaka, Japan",
    image: "kento.jpg"
  }
];
let img1Element, img2Element, img3Element, img4Element, img5Element, img6Element, img7Element;

function preload() {
  //load and position puppet images
  img1Element = createImg('joichi_puppet.jpg');
  img2Element = createImg('dai_puppet.jpg');
  img3Element = createImg('kazu_puppet.jpg');
  img4Element = createImg('kyo_puppet.jpg');
  img5Element = createImg('ryu_puppet.jpg');
  img6Element = createImg('mich_puppet.jpg');
  img7Element = createImg('ken_puppet.jpg');
  img1Element.position(80, 260); img1Element.size(250, 250);
  img2Element.position(350, 260); img2Element.size(250, 250);
  img3Element.position(620, 270); img3Element.size(250, 250);
  img4Element.position(900, 260); img4Element.size(250, 250);
  img5Element.position(1200, 260); img5Element.size(250, 250);
  img6Element.position(1500, 260); img6Element.size(250, 250);
  img7Element.position(1800, 260);  img7Element.size(250, 250);
}

// displays member info when clicked
function displayMemberInfo(member) {
  background('#ffffff');
  
  // membernames, colors, and text
  textSize(32);
  fill(0);
  text(member.name, 50, 600);
  text(member.colour, 50, 650);
  text(member.text, 50, 700);
  
  
  // member images
  let memberImg = createImg(member.image);
  memberImg.position(825, 500);
  memberImg.size(400, 400);
  memberImg.style('z-index', '2');
  memberImg.style('border-radius', '50%');
  memberImg.style('border', '2px solid #000');
  memberImg.style('background-color', member.memberColour);
  memberImg.style('padding', '10px');

  memberImg.style('transition', 'opacity 0.5s');


  localStorage.setItem('member', JSON.stringify(member));
  console.log('Member selected:', member.name);
}


function setup() {
  createCanvas(1650, 800);
  background('#ffffff');
  img1Element.mousePressed(function() {
    displayMemberInfo(members[0]);  // joichiro
  });
  img2Element.mousePressed(function() {
    displayMemberInfo(members[1]);  // daigo
  });
  img3Element.mousePressed(function() {
    displayMemberInfo(members[2]);  // kazuya
  });
  img4Element.mousePressed(function() {
    displayMemberInfo(members[3]);  // kyohei
  });
  img5Element.mousePressed(function() {
    displayMemberInfo(members[4]);  // ryusei
  });
  img6Element.mousePressed(function() {
    displayMemberInfo(members[5]);  // micchi
  });
  img7Element.mousePressed(function() {
    displayMemberInfo(members[6]);  // kento
  });
}

function draw() {
  if (isMouseOverImage() && mouseIsPressed) {
    console.log('Image clicked!');
  }
}
function isMouseOverImage() {
  return (
    mouseX > img1Element.x &&
    mouseX < img1Element.x + img1Element.width &&
    mouseY > img1Element.y &&
    mouseY < img1Element.y + img1Element.height
  );
}
function mousePressed() {
  if (isMouseOverImage()) {
    function displayMemberInfo(member) {}
      localStorage.setItem('member', JSON.stringify(member));
      console.log('Member selected:', member.name);
    }
  }




/*refs
web page where you pick a member of naniwa and get their info/a short scentence in their member colour, when you press reset you get a "welcome back" message from the member you picked previously. 
add a clearstorage function to clear the local storage when you press the "new member" button.
https://p5js.org/reference/p5/setItem/
https://www.w3schools.com/html/html5_audio.asp
https://stackoverflow.com/questions/4126708/how-to-style-html5-audio-tag

*/

