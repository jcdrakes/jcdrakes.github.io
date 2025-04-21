/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

monogatari.configuration ('credits', {
   
	"Developer": {
			"Artist, Story, Programming": "Jenelle",
		},
		"Music": {
			"French Café Waltz": ["Omar Faruque"],
			"Cafe Music": ["Anastasia Chubarova"],
			"Jazz Cafe Background Music": ["Maksym Malko"],
		},
		"Sound Effects": {
			"Trays": ["u_8t57ikf46v"],
			"doors": ["freesound_community, Hasin Amanda"],
		},
		"made with": {
			"Monogatari": ["https://monogatari.io"],
		}
	});
	
	
	
	
	// Define the images that will be available on your game's image gallery
	monogatari.assets ('gallery', {
	
	
	});
	
	
	// Define the music used in the game.
	monogatari.assets('music', {
		'title': 'french-cafe-waltz-316046.mp3',
		'cafe': 'cafe-music-163375.mp3',
		'jazz': 'jazz-cafe-background-music-318776.mp3',
	  });
	
	
	// Define the voice files used in the game.
	monogatari.assets ('voices', {
	
	
	});
	
	
	// Define the sounds used in the game.
	monogatari.assets ('sounds', {
	'trays': 'metal-pipe-230698.mp3',
	'clothes' : 'clothing-rustles-107170.mp3',
	'resume': 'fliping-paper-77903.mp3',
	'doorslam' : 'door-slam-angrily-86963.mp3',
	'dooropenclose' : 'door-open-close-with-bell-96884.mp3',
	
	});
	
	
	// Define the videos used in the game.
	monogatari.assets ('videos', {
	
	
	});
	
	
	// Define the images used in the game.
	monogatari.assets ('images', {
	
	
	});
	
	
	// Define the backgrounds for each scene.
	monogatari.assets ('scenes', {
	'blackbkgrnd' : 'blackbkgrnd.png',
	'kitchen' : 'kitchen.png',
	'cafe' : 'cafe.png',
	'tryon' : 'tryon.png',
	'latte1' : 'latte1.png', 'latte2' : 'latte2.png', 'latte3' : 'latte3.png', 'latte4' : 'latte4.png',
	'cappucchino1' : 'cappucchino1.png', 'cappucchino2' : 'cappucchino2.png', 'cappucchino3' : 'cappucchino3.png', 'cappucchino4' : 'cappucchino4.png',
	'iced1' : 'iced1.png', 'iced2' : 'iced2.png', 'iced3' : 'iced3.png', 'iced4' : 'iced4.png',
	});
	
	
	
	
	// Define the Characters
	monogatari.characters ({
		'gg': {
			name: 'Owner',
			color: '#ff7b3e',
			directory: 'owner',
		  sprites: {
				'owner-normal': 'owner-normal.png',
				'owner-speak': 'owner-speak.png'
			},
		},
		'mc': {
			name: '{{player.name}}',
			color: '#4f51c2'
		},
		'e': {
			name: 'Eri',
			color: '#23f1e0',
			directory: 'eri',
			sprites: {
				'eri-normal': 'eri-normal.png',
				'eri-happy': 'eri-happy.png',
				'eri-sad': 'eri-sad.png',
				'eri-angry': 'eri-angry.png',
				'eri-confused': 'eri-confused.png',
				'eri-surprised': 'eri-surprised.png',
				'eri-armup': 'eri-armup.png'
			},
		},
		'm': {
			name: 'Makoto',
			color: '#ff1717',
			directory: 'makoto',
			sprites: {
				'makoto-normal': 'makoto-normal.png',
				'makoto-happy': 'makoto-happy.png',
				'makoto-sad': 'makoto-sad.png',
				'makoto-angry': 'makoto-angry.png',
				'makoto-confused': 'makoto-confused.png',
				'makoto-surprised': 'makoto-surprised.png'
			},
		},
		's': {
			name: 'sebby',
			color: '#910c8a',
			directory: 'sebby',
			sprites: {
				'sebby-normal': 'sebby-normal.png',
				'sebby-happy': 'sebby-happy.png',
				'sebby-sad': 'sebby-sad.png',
				'sebby-angry': 'sebby-angry.png',
				'sebby-confused': 'sebby-confused.png',
				'sebby-mask': 'sebby-normal-mask.png'
			},
		}
	});
	
	
	monogatari.script ({
		// The game starts here.
		'Start': [
			'show scene blackbkgrnd with fadeout',
			'show notification Welcome',
				'gg Thank you again for agreeing to work with us. Considering our two other part-timers quit, we’re in a lot of trouble.',
				'gg Here’s your name tag. Feel free to write whatever name you feel like on it.',
			{
				'Input': {
					'Text': 'What is your name?',
					'Validation': function (input) {
						return input.trim ().length > 0;
					},
					'Save': function (input) {
						this.storage ({
							player: {
								name: input
							}
						});
						return true;
					},
					'Revert': function () {
						this.storage ({
							player: {
								name: ''
							}
						});
					},
					'Warning': 'You must enter a name!'
				}
			},
			'gg I know it’s sudden, but would you mind starting today? I’d like to get you introduced to the other employees…',
			'gg or what’s left of them…',
			//'y Hi {{player.name}} Welcome to Monogatari!',
			{
				'Choice': {
					'No': {
						'Text': 'I don’t know...',
						'Do': 'jump No'
					},
					'Yes': {
						'Text': ' Sure!',
						'Do': 'jump Yes'
					}
				}
			}
		],
	
	
		'No': [
			'gg Come with me!',
			'gg My staff here are top notch. I know you’ll get along with them well.',
			'jump day0Label'
		],
	
	
		'Yes': [
			'gg Come along!',
			'gg I’m sure you’ll love it here.',
			'jump day0Label'
		],

		'day0Label': [
			'show scene cafe with fadeout',
			'play sound trays with volume 30',
			'e AH, I’m so sorry… I wasn’t looking at where I was going!', 
			'show character e eri-sad class eriNormal',
			'play music title with fadein volume 60',
			'mc  …It’s fine, I mean it was probably impossible to see over that giant pile of trays you’re holding…?',
			' That... is a lot of trays…',
			'show character e eri-normal class eriLeft', 'show character gg owner-speak class ownerRight', 
			'gg  This is Eri, my granddaughter, head baker here. Since the other one quit, ahah…',
			'mc ……',
			'show character e eri-happy class eriLeft',  'show character gg owner-normal class ownerRight', 
			'e Are you the new hire?? What’s your name?',
			'mc  I’m {{player.name}}. Nice to meet you.',
			'e Wow {{player.name}}! Nice to meet you! Welcome to our little cafe bakery.',
			'mc It’s… definitely not little.',
			' Finally getting a good scan of the bakery.. It’s actually huge, like kind of ridiculously huge.. I wonder how many people it takes to run this place??',
			'gg Is Makoto around? I planned on introducing {{player.name}} to you both today.',
			' Both? No way only three people work here.',
			'mc Uh, sorry but.. Are there only 3 of you working here?',
			'show character gg owner-speak class ownerRight', 
			'gg Uh-',
			'show character e eri-confused class eriNormal', 'hide character gg with',
			'e THREE? HAHAHAH try two. My grandfather here is “retired” he only runs the place in name.', 
			'e I’m basically the manager…baker…server, barista…',
			'EUGH- have I been scammed..?',
			'show character e eri-sad class eriLeft', 'show character gg owner-speak class ownerNormal',
			'gg Now now…That doesn’t matter at all! Now you have {{player.name}} to help you, so you’ll be fine, we’ll be able to turn this place around..',
			'Turn it around..? I’ve definitely been scammed.',
			'play sound dooropenclose with volume 70',
			'The door opens and I see a boy with a red streak if hair over his eye standing at the entrance.',
			'show character m makoto-angry class makotoRight',
			'm Old man? What are you doing here?',
			'Is it so unusual for him to be here ??',
			'show character e eri-happy class eriLeft',
			'e Makoto! This is the new hire {{player.name}}, say hello.',
			'show character m makoto-normal class makotoRight',
			'm  Hey! Nice to meet you…I don’t know how you got roped into working at a place like this, but glad to have you!',
	
		{
			'Choice': {
				'regret': {
					'Text': 'Yeah, I’m starting to regret it.',
					'Do': 'jump regret'
				},
				'greet': {
					'Text': 'Nice to meet you too, I guess… ',
					'Do': 'jump greet'
				}
			}
		}
],
		'regret': [
			'show character gg owner-speak class ownerNormal',
			'gg  There’s nothing to regret! This place is wonderful!',
			'jump day0_1Label'
		],
	
	
		'greet': [
			'show character m makoto-happy class makotoRight',
			'm Sorry, that was a bit grim, this is an…Ok place to work.',
			'jump day0_1Label'
		],
		
		'day0_1Label': [
			'show scene cafe with fadeout',
			'show character e eri-angry class eriNormal',
			'e Can you both PLEASE stop trying to scare our new hire MINUTES after they got here...',
			'show character e eri-sad class eriNormal',
			'e Seriously.. No wonder everyone else quit on the spot.',
			'mc HUH??',
			'I cover my mouth as fast as I can.',
			'show character gg owner-speak class ownerNormal', 'show character m makoto-happy class makotoRight', 'show character e eri-sad class eriLeft',
			'gg  Well then. I will leave you three to get acquainted…',
			'gg Eri, you’re in charge as per usual. Here’s their resume…',
			'show character gg owner-normal class ownerNormal',
			'gg Do with it what you will.',
			'show character e eri-confused class eriLeft', 'hide character gg',
			'e  Pardon?? You haven’t even asked them what they want to do here yet??',
			'show character e eri-angry class eriNormal',
			'e WAIT…DON’T RUN AWA-', 
			'play sound doorslam with volume 80',
			'show character e eri-sad class eriNormal',
			'e  No way…', 
			'show character m makoto-normal class makotoRight',
			'e Uhm okay…So let me just look this over quickly, I guess.',
			' Okay, this is insane. I think I should just…',
			' I start slowly walking towards the door when I’m suddenly stopped by Makoto. And he locks the door.',
			'mc ACK-',
			'hide character e', 'show character m makoto-confused class makotoNormal',

			{
				'Choice': {
					'push': {
						'Text': 'Push Makoto',
						'Do': 'jump push'
					},
					'cry': {
						'Text': 'start to tear up',
						'Do': 'jump cry'
					}
				}
			}
	],
			'push': [
				'show character m makoto-angry class makotoNormal',
				'I run into Makoto with all my might, but he doesn’t budge.',
				'jump day0_2Label'
			],
		
		
			'cry': [
				'show character m makoto-sad class makotoNormal',
				'I see Makoto’s resolve start to waiver as the tears leave my ducts, but he doesn’t move from the door.',
				'jump day0_2Label'
			],

			day0_2Label: [
				'show character m makoto-surprised class makotoRight', 'show character e eri-surprised class eriLeft',
				'mc  This can’t be real.',
				'm Before you leave, PLEASE listen to what we have to say.',
				'm  This bakery really isn’t that bad. The customers are always kind…',
				'show character m makoto-sad class makotoRight', 'show character e eri-sad class eriLeft',
				'm And making drinks is fun…Talking to people is nice-',
				'play sound resume with volume 90',
				'show character e eri-normal class eriNormal', 'hide character m',
				'e It seems like you have experience as a barista and waiter…',
				'e ...and you like to bake for yourself in your free time?',
				'show character e eri-happy class eriNormal',
				'e That’s perfect!',
				'mc Yeah.. But honestly, I don’t think I’ll be a good fit here.',
				'mc Now, if you’ll excuse me…',
				'show character e eri-surprised class eriLeft', 'show character m makoto-angry class makotoRight',
				'm  NOT YET-',
				'e Why don’t you just do a trial run!',
				'show character e eri-sad class eriNormal', 'hide character m',
				'e 4 days-No….2 days- Just 2 days of working here…',
				'e Pay is weekly and you get to take home any of the extras we have for the day and-',
				'show character e eri-armup class eriNormal',
				'e And you can make stuff for yourself if there’s anything u wanna practice or try out…',
				'e Like your own recipes and-',
				'show character e eri-normal class eriLeft', 'show character m makoto-normal class makotoRight',
				'mc OKAY…Ok…Sure …Two days, right?', 'mc I can do that…But if anything weird or sketchy happens, I’m OUT.',
				'show character m makoto-happy class makotoRight', 'show character e eri-happy class eriLeft',
				'm   We’re not sketchy,  weird or scammy, right Eri?',
				'mc Um...I never said scammy…',
				'show character e eri-sad class eriLeft', 'show character m makoto-confused class makotoRight',
				'e  Just ignore him…Please.',
				'show character e eri-armup class eriLeft',
				'e Let me quickly show you around.Then Makoto will show you the different jobs we have here while I prep for opening.',
				'show character m makoto-happy class makotoRight',
				'mc Yeah…Okay...',
				'It can’t be that bad, right?',
				'stop music title with fadeOut',
				'jump day1Label',
			]


	});
	