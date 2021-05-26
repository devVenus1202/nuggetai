const dummyNames = [
  "Margarito Mcelrath",  
  "Clelia Whittle",  
  "Haywood Swopes",  
  "Suzy Iwamoto",  
  "Jennie Toal",  
  "Rochell Scheffel",  
  "Phuong Kerwin",  
  "Bernard Mariner",  
  "Andree Meuser",  
  "Barry Brandenburg",  
  "Spring Pinon",  
  "Delpha Burbank",  
  "Jung Aliff",  
  "Kendal Liberatore",  
  "Corinne Pollack",  
  "Stewart Stebbins", 
  "Kirstin Millen",  
  "Mayme Rondeau",
  "Becky Grass",  
  "Stacy Magwood",
  "Jaquelyn Bustamante",
  "Ouida Bruch",
  "Millicent Boatright",
  "Corrie Fortino",
  "Ester Giel",
  "Alverta Yousef",
  "Jolanda Oshields",
  "Abdul Tuller",
  "Eliza Bricker",
  "Cleta Sasser",
  "Lemuel Briere",
  "Vernell Knipp",
  "Kellye Whelpley",
  "Adriana Thomason",
  "Maximina Gately",
  "Nona Coach",
  "Bobbye Fredr", 
  "Tobie Alberto",
  "Giuseppe Devane",
  "Raven Bob",
  "Evelynn Kea",
  "Avis Kasprzak",
  "Roosevelt Faires",
  "Jimmy Prentice ",
  "Dwana Rousey ",
  "Joette Bilodea",
];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getFirstName = fullname => {
  return fullname.split(' ')[0];
}

const getLastName = fullname => {
  return fullname.split(' ')[1];
}

const getEmail = fullname => {
  return fullname.replace(' ', '.') + '@company.com';
}

const getRandomRank = (n) => {
  return getRandomInt(n);
}

const getRandomScore = () => {
  return getRandomInt(100);
}

const getRandomName = () => {
  return dummyNames[getRandomInt(20)];
}

const getDummyProfiles = (count, type) => {
  let result = [];
  for (let i = 0; i < count; i ++) {
    const data = {};
    const fullname = getRandomName();

    data['id'] = i;
    data['firstname'] = getFirstName(fullname);
    data['lastname'] = getLastName(fullname);
    data['email'] = getEmail(fullname);
    data['score'] = getRandomScore();
    data['rank'] = getRandomRank(count);

    result.push(data);
  }

  return result;
}

export default getDummyProfiles;