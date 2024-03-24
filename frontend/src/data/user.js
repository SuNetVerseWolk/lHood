import avatar from '../assets/profileGif.gif'

export const people = [
	{id: '0', name: 'John Doe', img: avatar},
	{id: '1', name: 'Mis. Sarahj', img: avatar},
	{id: '2', name: 'Mis. Emilyl', img: avatar},
	{id: '3', name: 'Mis. Sophian', img: avatar},
	{id: '4', name: 'Mis. Isabellan', img: avatar},
	{id: '5', name: 'Mis. b', img: avatar},
	{id: '6', name: 'Mis. Mian', img: avatar},
	{id: '7', name: 'Mis. Charlotteb', img: avatar},
	{id: '8', name: 'Mis. Oliviab', img: avatar},
	{id: '9', name: 'Mis. Ameliav', img: avatar},
	{id: 'a', name: 'Mis. Harperv', img: avatar},
	{id: 'a1', name: 'Mis. Sarahh', img: avatar},
	{id: 'a2', name: 'Mis. Emilyi', img: avatar},
	{id: 'a3', name: 'Mis. Sophiaj', img: avatar},
	{id: 'a4', name: 'Mis. Isabella', img: avatar},
	{id: 'a5', name: 'Mis. Ava', img: avatar},
	{id: 'a6', name: 'Mis. Mia', img: avatar},
	{id: 'a7', name: 'Mis. Charlotte', img: avatar},
	{id: 'a8', name: 'Mis. Olivia', img: avatar},
	{id: 'a9', name: 'Mis. Amelia', img: avatar},
	{id: 'b', name: 'Mis. Harper', img: avatar}
]

export const userDefaultData = {
	"name": "Wolk",
	"avatar": avatar,
	"people" : [],
	patterns: [
		{
			cardsValues : ['home','house','room'],
			cards: [
				{
					id: new Date().getTime(),
					"value": "home",
					"level": "A1",
					"type": "noun",
					"IPA": "\\ həʊm \\",
					"description": "The place where one lives",
					"example": "What is your home address?",
					"tips": [
						{
							id: new Date().getTime(),
							"value": "The place where one lives",
							"description": "The place where one lives",
							"example":"What is your home address?"
						},
						{
							id: new Date().getTime(),
							"value": "The place where one is born",
							"description": "The place where one is born",
							"example":"Where was I born?"
						}
					]
				},
				{
					id: new Date().getTime(),
					"img": avatar,
					"value": "house",
					"level": "A1",
					"type": "noun",
					"IPA": "\\ həʊm \\",
					"description": "The place where one lives",
					"example": "What is your home address?",
					"tips": [
						{
							id: new Date().getTime(),
							"value": "Building",
							"description": "The place where one lives",
							"example":"What is your home address?"
						}
					]
				},
				{
					id: new Date().getTime(),
					"img": "",
					value: "room",
					level: "B2",
					type: "noun",
					IPA: "r ohm",
					description: "A separate part of a house or building, such as the living room or bedroom.",
					example: "Which room do you sleep in?",
					tips: [
						{
							id: new Date().getTime(),
							"value": "Living Room",
							"description": "The main room for eating and relaxing.",
							example: "I like to watch TV in the living room."
						}
					]
				}
			]
		}
	]
};

export const isLogined = e => localStorage.getItem("logined") || 1;
const userDataManager = {
	logined: localStorage.getItem("logined")
};

export default userDataManager;