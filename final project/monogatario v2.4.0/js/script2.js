

monogatari.script({
    'day1Label': [
    'show scene cafe with fadeIn',
    'play music cafe with fadeIn volume 60 loop',
      'I came back… I’m almost surprised with myself honestly.',
      'show character m makoto-surprised class makotoNormal',
      'm YOU CAME BACK???',
      'mc Ughh…Don’t act so shocked.',
       'show character m makoto-sad class makotoNormal',
      'm Sorry- I’m sorry, we’ve been hiring for 4 months, but no one usually comes back after they hear about…Our situation. ',
      'mc I can see why.',
       'show character m makoto-happy class makotoNormal',
      'm  None of that matters anymore!', 'm You’ll be training with me today since Eri is super busy. ',
      'm Today, I’ll properly show you around and then start you on the drink menu since you have experience there.',
      'show scene cafe with fadeOut',  'show scene cafe with fadeIn',
      'm Here’s the ordering counter with our pastry display, and behind it is the coffee bar.',
      'm And this is the dining area. We usually put seats outside when the weather is nice as well. And the bathroom and trash cans are over there.',
        'm And over there is the kitchen.',
        'show scene kitchen with fadeIn',
        'm  This is the kitchen, it’s huge, isn’t it! ',
        ' I still can’t get over how small this place looks on the outside…',

			{
				'Choice': {
					'yeah': {
						'Text': 'It’s impressive!',
						'Do': 'jump yeah'
					},
					'eh': {
						'Text': ' It seems like it will be impossible to clean…',
						'Do': 'jump eh'
					}
				}
			}
	],
			'yeah': [
				'm I know right! It’s a lot of work, but it’s worth it!',
				'jump day1_1Label'
			],
		
		
			'eh': [
				'm it’s not that bad!',
                'm I mean, it’s a lot of work, but it’s worth it!',
				'jump day1_1Label'
			],
            'day1_1Label': [
                'show scene kitchen',
                'm There’s the fridge, oven, sink, and the pantry is over there, pretty simple layout, nothing you’ll need to think about today, though! ',
                'm Let’s get started making drinks!',
                'm Actually, let’s get you into uniform first. ',
                'Makoto hands me a white uniform with a long brown apron, and I walk over to the bathroom to try it on. ',
                'stop music cafe with fade 2',
                 'show scene tryon with fadeIn',
                'play sound clothes with fadeIn volume 90',
                'I run to the bathroom and try on the uniform.',
                 'mc Not bad.',
                 'show scene cafe with fadeIn',
                 'play music cafe with fadeIn volume 60 loop', 
                'show character m makoto-happy class makotoNormal',
                'm Woah! It suits you- see now you can never qui-',
                'mc I still have till tomorrow to decide.',
                'show character m makoto-sad class makotoNormal',
                'I hear Makoto sigh out loud.',
                'show character m makoto-normal class makotoNormal',
                'm Here’s our drink menu, and these are our most popular drinks.',
                ' Looking at this menu, it seems a lot more artisanal than what I made at St*rbooks…',
                'mc You guys do latte art??',
                'show character m makoto-happy class makotoNormal',
                'm  Of course! It was Eri’s idea since she always sees it on Y. Speaking of, you should follow the cafe on there! I take all the promotional photos for it since I’m…',
                'show character m makoto-sad class makotoNormal',
                'm Technically, a photographer.',
                'mc Oh? You like photography?  ',
                'show character m makoto-happy class makotoNormal',
                'm Yeah, my sister gave me her camera when we were younger, and I’ve used it ever since.',
                'mc Why are you working here then?',
                'show character m makoto-sad class makotoNormal',
                'm I mean…Have you seen the state of…well, everything recently? One of my cousins went to school for neuroscience, and they’re currently a bank teller.',
                'I nod in understanding.',
                'show character m makoto-normal class makotoNormal',
                'm I’m also in school for art right now, but it’s not going that well.',
                'm  I do enjoy baking and serving though. And maybe one day someone will see my food photos and reach out, you know! ',
                'mc That makes sense- sorry if I sounded a bit snide.',
                'show character m makoto-happy class makotoNormal',
                'm No worries, have any drinks caught your eye? ',
                'I scan my eyes over the menu again, landing on...',
                'show character m makoto-normal class makotoNormal',

                {
                    'Choice': {
                        'latte': {
                            'Text': 'Caramel Latte',
                            'Do': 'jump latte'
                        },
                        'cap': {
                            'Text': 'Chocolate Cappuccino',
                            'Do': 'jump cap'
                        },
                        'cafe': {
                            'Text': 'Iced Coffee',
                            'Do': 'jump iced'
                        }
                    }
                }
        ],
                'latte': [
                    'show character m makoto-happy class makotoNormal',
                    'm Perfect, I’ll show you how we make it here!',
                    'm First we make the expresso with this machine over here.',
                    'hide character m',
                    'show scene latte1 with fadeIn',
                    'm Then we warm the milk and froth it with this french press. Impressive right?',
                    'show scene latte2 with fadeIn',
                    'm Then we pour the milk over the expresso and add caramel syrup.',
                    'm And when decorating we fill the cup with the milk foam to create our 3d latte art.',
                    'show scene latte3 with fadeIn',
                    'm To make the designs we use some of the leftover latte to draw on the foam, very gently with a toothpick!',
                    'm And finally, we add a drizzle of caramel syrup on top.',
                    'show scene latte4 with fadeIn',
                    'm And voila! What do you think?',

                    {
                        'Choice': {
                            'nice': {
                                'Text': 'That’s really nice!',
                                'Do': 'jump nice'
                            },
                            'not': {
                                'Text': 'That seems like a lot of work…',
                                'Do': 'jump not'
                            }
                        }
                    }
                ],

                    'nice': [
                        'show scene cafe',
                        'show character m makoto-happy class makotoNormal',
                        'm We can make all kinds of designs with it too!',
                        'm I’ll show you how to make a cute bear next time!',
                        'jump day1_2Label'
                    ],

                    'not': [
                        'show scene cafe',
                        'show character m makoto-sad class makotoNormal',
                        'm There’s definetly a bit of a learning curve, but it’s not that bad!',
                        'show character m makoto-happy class makotoNormal',
                        'm You’ll get used to it in no time!',
                        'm I’ll show you how to make an easier design next time!',
                        'jump day1_2Label'
                    ],
            
            
                'cap': [
                    'm Perfect, I’ll show you how we make it here!',
                    'm Our cappuccinos are probably a bit different from the ones you’re used to.',
                    'hide character m',
                    'show scene cappucchino1 with fadeIn',
                    'm First we add ground coffee beans, milk, cocoa powder, vanilla extract and chocolate chips to a saucepan.',
                    'm Then we mix it together and bring it to a simmer.',
                    'show scene cappucchino2 with fadeIn',
                    'm Then we transfer it to the french press to steep for a few minutes.',
                    'm Then we warm the milk and froth it with the french press.',
                    'm Cappuiccions are usually equal parts milk and coffee, so we try to measure it out.',
                    'show scene cappucchino3 with fadeIn',
                    'm Then we pour the milk over the expresso, adding the milk foam as well.',
                    'm And finally, we add a chocolate syrup and sprinkle of cocoa powder on top!',
                    'show scene cappucchino4 with fadeIn',
                    'm And done! What do you think?',

                    {
                        'Choice': {
                            'yum': {
                                'Text': 'It looks delicious!',
                                'Do': 'jump yum'
                            },
                            'hard': {
                                'Text': 'That was pretty hard...',
                                'Do': 'jump hard'
                            }
                        }
                    }
                ],

                    'yum': [
                        'show scene cafe',
                        'show character m makoto-happy class makotoNormal',
                        'm Customers love it! no matter the weather outside!',
                        'm It’s definetly a lot but it’s worth it!',
                        'jump day1_2Label'
                    ],

                    'hard': [
                        'show scene cafe',
                        'show character m makoto-sad class makotoNormal',
                        'm It’s not that hard once you get the hang of it trust me!',
                        'show character m makoto-happy class makotoNormal',
                        'm You’ll get used to it in no time!',
                        'm I can go over it again with you next time!',
                        'jump day1_2Label'
                    ],
                   
                'iced': [
                    'm Perfect, I’ll show you how we make it here!',
                    'm Iced coffee is the easiest drink we have other than expresso!',
                    'hide character m',
                    'show scene iced1 with fadeIn',
                    'm First we brew the coffee and let it steep for a few minutes.',
                    'm We make a pretty strong concentrate becuase the coffee flavour gets diluted when the ice melts!',
                    'show scene iced2 with fadeIn',
                    'm Then we grab a glass and fill it half way with ice-',
                    'show scene iced3 with fadeIn',
                    'm Pour in the coffee once it’s cooled down, then add milk and syrup to taste!',
                    'show scene iced4 with fadeIn',
                    'm Finished! easy right?',

                    {
                        'Choice': {
                            'easy': {
                                'Text': 'That was so simple!',
                                'Do': 'jump easy'
                            },
                            'lost': {
                                'Text': 'I’m not sure if I can remember all that...',
                                'Do': 'jump lost'
                            }
                        }
                    }
                ],

                    'easy': [
                        'show scene cafe',
                        'show character m makoto-happy class makotoNormal',
                        'm Simple and easy!',
                        'm You just have to make sure you brew enough coffee~',
                        'm Once you master this, the rest will be a piece of cake!',
                        'jump day1_2Label'
                    ],

                    'lost': [
                        'show scene cafe',
                        'show character m makoto-sad class makotoNormal',
                        'm don’t say that. You can do it!',
                        'show character m makoto-happy class makotoNormal',
                        'm If you really can’t remember, we can try it again together!', 
                        'jump day1_2Label'
                    ],

                'day1_2Label': [
                    'show scene cafe',
                    'show character m makoto-happy class makotoNormal',
                    'm  And those are some of the best selling the drinks on our menu!  I hope it wasn’t too much for your first day. ',
                    'show character m makoto-normal class makotoNormal',
                    'mc It honestly wasn’t that bad, hopefully I’ll be able to remember everything when customers come in as well.',
                    'show scene blackbkgrnd with fadeIn',
                    'As the day comes to a close, I feel like I learned a bit more about Makoto.',
                    'jump day2Label',
                ],

                'day2Label': [
                 'stop music cafe',
                'show scene blackbkgrnd',
                'play music jazz with fadeIn volume 60 loop',
                'centered Thank you for playing the demo of pâtisserie ultime!',
                'centered  Made with Monogatari!',
                'centered Art, Story, Design, Programming: Jenelle C',
                'centered Music: French Café Waltz: Omar Faruque, Cafe Music Anastasia Chubarova, Jazz Cafe Background Music Maksym Malko',
                'centered sound effects from: u_8t57ikf46v, freesound_community, and Hasin Amanda',
                'end',
            ]
            
            
});