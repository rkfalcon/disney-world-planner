-- Update Disney World attractions with complete data
-- Run this if you already have the tables created

-- Clear existing attractions and re-seed
DELETE FROM itinerary_items;
DELETE FROM dining_reservations;
DELETE FROM itinerary_days;
DELETE FROM trips;
DELETE FROM attractions;
DELETE FROM parks;

-- Insert Parks
INSERT INTO parks (id, name, slug, description, image_url, map_url, color) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Magic Kingdom', 'magic-kingdom', 'The most magical place on Earth featuring classic attractions, enchanting fireworks, and beloved Disney characters. Home to Cinderella Castle and six themed lands.', 'https://images.unsplash.com/photo-1436491865332-7a61a109db56?w=800', '', '#1e40af'),
  ('22222222-2222-2222-2222-222222222222', 'EPCOT', 'epcot', 'Explore future technologies and world cultures across two distinct areas: World Celebration and World Showcase with pavilions representing 11 countries.', 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800', '', '#7c3aed'),
  ('33333333-3333-3333-3333-333333333333', 'Hollywood Studios', 'hollywood-studios', 'Lights, camera, action! Experience thrilling attractions inspired by movies, TV shows, and music. Home to Star Wars: Galaxy''s Edge and Toy Story Land.', 'https://images.unsplash.com/photo-1575375082449-65e7e1f6e3f8?w=800', '', '#dc2626'),
  ('44444444-4444-4444-4444-444444444444', 'Animal Kingdom', 'animal-kingdom', 'Explore the magic of nature with thrilling adventures, exotic animals, and the awe-inspiring world of Pandora. Disney''s largest theme park.', 'https://images.unsplash.com/photo-1564429238961-bf8e8beda01e?w=800', '', '#16a34a')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Clear existing attractions to replace with complete data
DELETE FROM attractions;

-- ============================================
-- MAGIC KINGDOM — All Attractions
-- ============================================
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
-- Main Street, U.S.A.
('11111111-1111-1111-1111-111111111111', 'Walt Disney World Railroad', 'Take a scenic 20-minute grand circle tour of the Magic Kingdom aboard a vintage steam-powered train with stops at Main Street, Frontierland, and Fantasyland.', 'ride', 1, 15, false),
('11111111-1111-1111-1111-111111111111', 'Town Square Theater - Meet Mickey Mouse', 'Meet Mickey Mouse in his magician outfit at this dedicated character greeting location on Main Street, U.S.A.', 'character_meet', 1, 40, true),
('11111111-1111-1111-1111-111111111111', 'Town Square Theater - Meet Tinker Bell', 'Meet Tinker Bell and her fairy friends at Town Square Theater on Main Street, U.S.A.', 'character_meet', 1, 25, false),

-- Adventureland
('11111111-1111-1111-1111-111111111111', 'Pirates of the Caribbean', 'Set sail on a swashbuckling voyage through pirate-infested waters with Audio-Animatronic buccaneers, cannon fire, and Captain Jack Sparrow.', 'ride', 1, 25, false),
('11111111-1111-1111-1111-111111111111', 'Jungle Cruise', 'Embark on a tongue-in-cheek cruise through exotic rivers of the world, encountering hippos, elephants, and the legendary backside of water.', 'ride', 1, 35, true),
('11111111-1111-1111-1111-111111111111', 'The Magic Carpets of Aladdin', 'Soar on a magic carpet ride above Adventureland, controlling your carpet''s height and tilt while a mischievous camel spits water.', 'ride', 1, 15, false),
('11111111-1111-1111-1111-111111111111', 'Walt Disney''s Enchanted Tiki Room', 'Enjoy a tropical serenade by Audio-Animatronic birds, flowers, and tiki statues in this classic attraction inspired by Polynesian culture.', 'show', 1, 10, false),
('11111111-1111-1111-1111-111111111111', 'A Pirate''s Adventure: Treasures of the Seven Seas', 'Embark on an interactive scavenger hunt through Adventureland using a magic talisman to find pirate treasure and battle enemies.', 'show', 1, 0, false),
('11111111-1111-1111-1111-111111111111', 'Swiss Family Treehouse', 'Explore the towering treehouse home of the shipwrecked Swiss Family Robinson, featuring ingenious rooms built among the branches.', 'show', 1, 10, false),

-- Frontierland
('11111111-1111-1111-1111-111111111111', 'Big Thunder Mountain Railroad', 'Hold on to your hats for the wildest ride in the wilderness — a runaway mine train through the haunted caverns and canyons of Big Thunder Mountain.', 'ride', 3, 45, true),
('11111111-1111-1111-1111-111111111111', 'Tiana''s Bayou Adventure', 'Join Princess Tiana and friends on a musical journey through the bayou, culminating in a thrilling 5-story splash down. Features new Audio-Animatronics and original music.', 'ride', 4, 75, true),
('11111111-1111-1111-1111-111111111111', 'Tom Sawyer Island', 'Explore caves, barrel bridges, and a frontier fort on this rustic island accessible only by log raft across the Rivers of America.', 'show', 1, 5, false),
('11111111-1111-1111-1111-111111111111', 'Country Bear Jamboree', 'Enjoy a knee-slapping musical revue performed by Audio-Animatronic bears in the Grizzly Hall theater. Recently updated with new songs.', 'show', 1, 10, false),

-- Liberty Square
('11111111-1111-1111-1111-111111111111', 'Haunted Mansion', 'Tour a haunted estate filled with 999 happy haunts in this classic Doom Buggy dark ride through ghostly scenes with incredible special effects.', 'ride', 2, 30, true),
('11111111-1111-1111-1111-111111111111', 'The Hall of Presidents', 'Experience an awe-inspiring stage show featuring Audio-Animatronic figures of every U.S. president in a celebration of American leadership.', 'show', 1, 10, false),
('11111111-1111-1111-1111-111111111111', 'Liberty Square Riverboat', 'Board the Liberty Belle steamboat for a relaxing cruise along the Rivers of America, passing by Tom Sawyer Island and frontier scenery.', 'ride', 1, 10, false),

-- Fantasyland
('11111111-1111-1111-1111-111111111111', 'Seven Dwarfs Mine Train', 'Race through the diamond mine where the Seven Dwarfs work on this family-friendly coaster with swaying mine cars and stunning animatronics.', 'ride', 3, 75, true),
('11111111-1111-1111-1111-111111111111', 'Peter Pan''s Flight', 'Soar in a pirate galleon over moonlit London and into the heart of Never Land with Peter Pan in this beloved classic dark ride.', 'ride', 1, 60, true),
('11111111-1111-1111-1111-111111111111', 'it''s a small world', 'Cruise through a whimsical world of nearly 300 Audio-Animatronic dolls singing the iconic song and representing cultures from around the globe.', 'ride', 1, 15, false),
('11111111-1111-1111-1111-111111111111', 'The Many Adventures of Winnie the Pooh', 'Bounce, float, and whoosh through the Hundred Acre Wood with Pooh and friends on this gentle dark ride through storybook scenes.', 'ride', 1, 30, true),
('11111111-1111-1111-1111-111111111111', 'Under the Sea - Journey of The Little Mermaid', 'Descend beneath the ocean in a clamshell to relive Ariel''s story with dazzling animatronics and classic songs from The Little Mermaid.', 'ride', 1, 20, false),
('11111111-1111-1111-1111-111111111111', 'Prince Charming Regal Carrousel', 'Take a spin on this beautifully restored antique carousel featuring 90 hand-painted horses beneath a stunning canopy.', 'ride', 1, 10, false),
('11111111-1111-1111-1111-111111111111', 'Dumbo the Flying Elephant', 'Soar through the sky on the back of Dumbo the flying elephant, controlling your own altitude on this classic spinning ride.', 'ride', 1, 20, false),
('11111111-1111-1111-1111-111111111111', 'The Barnstormer', 'Take flight on The Great Goofini''s daring stunt plane in this junior coaster perfect for young thrill-seekers. Height: 35 inches.', 'ride', 2, 20, false),
('11111111-1111-1111-1111-111111111111', 'Mad Tea Party', 'Spin, spin, spin in colorful oversized teacups inspired by the Unbirthday Party scene from Alice in Wonderland.', 'ride', 2, 15, false),
('11111111-1111-1111-1111-111111111111', 'Mickey''s PhilharMagic', 'Experience a 3D concert spectacular where Donald Duck accidentally unleashes magical mayhem through beloved Disney musical numbers.', 'show', 1, 10, false),
('11111111-1111-1111-1111-111111111111', 'Ariel''s Grotto - Meet Ariel', 'Meet Ariel the Little Mermaid in her seaside grotto near her attraction in Fantasyland.', 'character_meet', 1, 25, false),
('11111111-1111-1111-1111-111111111111', 'Enchanted Tales with Belle', 'Step into Beast''s enchanted castle and help Belle tell the tale of how she tamed the Beast in this interactive storytelling experience.', 'show', 1, 25, true),
('11111111-1111-1111-1111-111111111111', 'Princess Fairytale Hall', 'Meet Disney princesses including Cinderella, Rapunzel, Tiana, and Elena in an elegant royal portrait hall in Fantasyland.', 'character_meet', 1, 35, true),
('11111111-1111-1111-1111-111111111111', 'Casey Jr. Splash ''N'' Soak Station', 'Cool off in this circus-themed splash area where Casey Jr.''s train cars spray water for kids to play in.', 'show', 1, 0, false),

-- Tomorrowland
('11111111-1111-1111-1111-111111111111', 'TRON Lightcycle / Run', 'Launch into the Grid on one of the fastest coasters at Walt Disney World, racing on a lightcycle at speeds up to 59 mph. Height: 48 inches.', 'ride', 5, 90, true),
('11111111-1111-1111-1111-111111111111', 'Space Mountain', 'Blast off on a thrilling rocket ride through the dark reaches of outer space on this iconic indoor roller coaster. Height: 44 inches.', 'ride', 4, 55, true),
('11111111-1111-1111-1111-111111111111', 'Buzz Lightyear''s Space Ranger Spin', 'Help Buzz Lightyear defeat Emperor Zurg by firing lasers at targets throughout this interactive spinning dark ride.', 'ride', 1, 25, true),
('11111111-1111-1111-1111-111111111111', 'Tomorrowland Transit Authority PeopleMover', 'Glide on a relaxing elevated tour of Tomorrowland on this linear induction-powered ride with views inside Space Mountain and Buzz Lightyear.', 'ride', 1, 10, false),
('11111111-1111-1111-1111-111111111111', 'Astro Orbiter', 'Pilot a retro rocket ship high above Tomorrowland on this elevated spinning ride with sweeping views of the Magic Kingdom.', 'ride', 2, 20, false),
('11111111-1111-1111-1111-111111111111', 'Tomorrowland Speedway', 'Race gas-powered go-karts along a winding outdoor track at this classic driving attraction. Height: 32 inches to ride, 54 inches to drive alone.', 'ride', 1, 25, false),
('11111111-1111-1111-1111-111111111111', 'Monsters Inc. Laugh Floor', 'Join Mike Wazowski and friends for an interactive comedy show where monsters perform live improvised jokes with audience participation.', 'show', 1, 15, false),
('11111111-1111-1111-1111-111111111111', 'Carousel of Progress', 'Experience Walt Disney''s beloved theater show featuring Audio-Animatronic families showcasing technological progress from the 1900s to today.', 'show', 1, 5, false),

-- Nighttime & Parades
('11111111-1111-1111-1111-111111111111', 'Happily Ever After Fireworks', 'The Magic Kingdom''s spectacular nighttime fireworks and projection show on Cinderella Castle celebrating Disney stories and magic.', 'show', 1, 0, false),
('11111111-1111-1111-1111-111111111111', 'Festival of Fantasy Parade', 'A dazzling daytime parade featuring elaborate floats, beloved Disney characters, dancers, and music traveling down Main Street, U.S.A.', 'show', 1, 0, false),

-- Dining
('11111111-1111-1111-1111-111111111111', 'Be Our Guest Restaurant', 'Dine in the enchanted castle from Beauty and the Beast with three themed rooms including the grand ballroom and the mysterious West Wing.', 'dining', 1, 0, false),
('11111111-1111-1111-1111-111111111111', 'The Crystal Palace', 'Buffet-style character dining featuring Winnie the Pooh and friends in a beautiful Victorian glass conservatory on Main Street.', 'dining', 1, 0, false),
('11111111-1111-1111-1111-111111111111', 'Cinderella''s Royal Table', 'Dine inside Cinderella Castle with Disney princess character appearances in this magical royal dining experience.', 'dining', 1, 0, false),
('11111111-1111-1111-1111-111111111111', 'Liberty Tree Tavern', 'Enjoy an all-you-care-to-eat Thanksgiving-style feast of turkey, pot roast, and traditional sides in a Colonial American setting.', 'dining', 1, 0, false),
('11111111-1111-1111-1111-111111111111', 'Skipper Canteen', 'Adventurous cuisine served by Jungle Cruise skippers in a themed restaurant featuring exotic rooms and the signature humor of the skippers.', 'dining', 1, 0, false);

-- ============================================
-- EPCOT — All Attractions
-- ============================================
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
-- World Celebration / World Discovery / World Nature
('22222222-2222-2222-2222-222222222222', 'Guardians of the Galaxy: Cosmic Rewind', 'Disney''s first reverse-launch indoor roller coaster — race through the cosmos with the Guardians on a spinning coaster set to an awesome mixtape soundtrack. Height: 42 inches.', 'ride', 5, 90, true),
('22222222-2222-2222-2222-222222222222', 'Test Track', 'Design your own virtual concept car and take it for a high-speed spin reaching 65 mph on the outdoor track. Reimagined in 2025 with automotive-inspired theming. Height: 40 inches.', 'ride', 4, 60, true),
('22222222-2222-2222-2222-222222222222', 'Mission: SPACE', 'Experience the forces of a rocket launch in this centrifuge simulator. Choose Orange (intense G-force Mars mission) or Green (gentler Earth orbit). Height: 40 inches.', 'ride', 5, 25, true),
('22222222-2222-2222-2222-222222222222', 'Spaceship Earth', 'Journey through the history of human communication from cave paintings to the digital age inside EPCOT''s iconic 180-foot geodesic sphere.', 'ride', 1, 20, false),
('22222222-2222-2222-2222-222222222222', 'Soarin'' Around the World', 'Experience a breathtaking hang-gliding flight over world landmarks with scent and wind effects on a 180-degree IMAX dome screen. Height: 40 inches.', 'ride', 2, 45, true),
('22222222-2222-2222-2222-222222222222', 'Living with the Land', 'Cruise through working greenhouses and aquaculture facilities that grow food served in Disney World restaurants on this educational boat ride.', 'ride', 1, 15, false),
('22222222-2222-2222-2222-222222222222', 'The Seas with Nemo & Friends', 'Journey under the sea with Nemo and friends in clamshell vehicles, then explore one of the largest indoor aquariums in North America.', 'ride', 1, 15, false),
('22222222-2222-2222-2222-222222222222', 'Journey Into Imagination with Figment', 'Take a whimsical ride through the Imagination Institute with Figment the purple dragon exploring the five senses. Features the classic song "One Little Spark."', 'ride', 1, 10, false),

-- World Showcase Rides
('22222222-2222-2222-2222-222222222222', 'Frozen Ever After', 'Cruise through the kingdom of Arendelle aboard a Viking longship with Anna, Elsa, and friends featuring updated Audio-Animatronics and magical effects.', 'ride', 2, 55, true),
('22222222-2222-2222-2222-222222222222', 'Remy''s Ratatouille Adventure', 'Shrink down to the size of Chef Remy for a trackless 4D chase through Gusteau''s restaurant kitchen in the France Pavilion.', 'ride', 2, 50, true),
('22222222-2222-2222-2222-222222222222', 'Gran Fiesta Tour Starring The Three Caballeros', 'Cruise through the Mexico Pavilion pyramid on a gentle boat ride through Mexican scenes while searching for Donald Duck before a Three Caballeros concert.', 'ride', 1, 10, false),

-- Shows & Films
('22222222-2222-2222-2222-222222222222', 'The American Adventure', 'A 30-minute Audio-Animatronic theater show narrated by Ben Franklin and Mark Twain, showcasing key moments in American history.', 'show', 1, 10, false),
('22222222-2222-2222-2222-222222222222', 'Turtle Talk with Crush', 'Join an interactive live show where Crush from Finding Nemo holds real-time improvised conversations with audience members.', 'show', 1, 15, false),
('22222222-2222-2222-2222-222222222222', 'Awesome Planet', 'A 15-minute nature documentary film celebrating Earth''s ecosystems in the Land Pavilion with in-theater effects.', 'show', 1, 5, false),
('22222222-2222-2222-2222-222222222222', 'Beauty and the Beast Sing-Along', 'A 15-minute sing-along retelling of Beauty and the Beast with on-screen lyrics in the France Pavilion theater.', 'show', 1, 10, false),
('22222222-2222-2222-2222-222222222222', 'Canada Far and Wide in Circle-Vision 360', 'A 12-minute immersive 360-degree standing film showcasing Canada''s stunning landscapes, wildlife, and culture.', 'show', 1, 10, false),
('22222222-2222-2222-2222-222222222222', 'Reflections of China', 'A 14-minute Circle-Vision 360-degree standing film touring China''s major landmarks, ancient temples, and modern cities.', 'show', 1, 10, false),
('22222222-2222-2222-2222-222222222222', 'Impressions de France', 'An 18-minute widescreen film showcasing the beauty of France''s landscapes and cultural landmarks set to classical music.', 'show', 1, 10, false),
('22222222-2222-2222-2222-222222222222', 'Disney & Pixar Short Film Festival', 'A 4D film presentation featuring Disney and Pixar short films including in-seat effects at the Magic Eye Theater.', 'show', 1, 10, false),
('22222222-2222-2222-2222-222222222222', 'Voices of Liberty', 'An eight-person a cappella ensemble performing patriotic American songs inside the American Adventure rotunda.', 'show', 1, 5, false),
('22222222-2222-2222-2222-222222222222', 'JAMMitors', 'Musical street performance by a cleanup crew playing instruments made from trash cans and cleaning supplies.', 'show', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Mariachi Cobre', 'Traditional mariachi band performing scheduled sets in and around the Mexico Pavilion in World Showcase.', 'show', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Matsuriza', 'Traditional Japanese Taiko drumming group performing energetic shows in the Japan Pavilion courtyard.', 'show', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Luminous: The Symphony of Us', 'EPCOT''s nightly nighttime spectacular featuring fireworks, fountains, and music over the World Showcase Lagoon celebrating global connection.', 'show', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Celebracion Encanto!', 'Live musical performance celebrating the world of Encanto with music and dancing at CommuniCore Plaza.', 'show', 1, 0, false),

-- Experiences
('22222222-2222-2222-2222-222222222222', 'Journey of Water, Inspired by Moana', 'Walk-through outdoor interactive water attraction where guests interact with water that responds to touch, inspired by Moana.', 'show', 1, 15, false),
('22222222-2222-2222-2222-222222222222', 'Club Cool', 'Free Coca-Cola international flavor tasting station featuring soft drinks from around the world, including some famously unusual flavors.', 'show', 1, 5, false),
('22222222-2222-2222-2222-222222222222', 'Kidcot Fun Stops', 'Activity stations in each World Showcase pavilion where kids can collect cards and learn fun facts about each country.', 'show', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'The Seas Aquarium', 'One of the largest inland saltwater aquariums in North America with marine life displays, demonstrations, and underwater viewing areas.', 'show', 1, 10, false),

-- Character Meets
('22222222-2222-2222-2222-222222222222', 'Meet Disney Pals at World Celebration', 'Meet Mickey Mouse and other Disney friends at their dedicated greeting location near CommuniCore Hall.', 'character_meet', 1, 25, false),
('22222222-2222-2222-2222-222222222222', 'Meet Anna and Elsa at Royal Sommerhus', 'Meet Anna and Elsa from Frozen at their royal cabin in the Norway Pavilion of World Showcase.', 'character_meet', 1, 35, false),
('22222222-2222-2222-2222-222222222222', 'Meet Snow White at Germany Pavilion', 'Meet Snow White at her wishing well in the Germany Pavilion of World Showcase.', 'character_meet', 1, 20, false),
('22222222-2222-2222-2222-222222222222', 'Meet Mulan at China Pavilion', 'Meet Mulan at the China Pavilion in World Showcase.', 'character_meet', 1, 15, false),
('22222222-2222-2222-2222-222222222222', 'Meet Mary Poppins at United Kingdom Pavilion', 'Meet Mary Poppins at the United Kingdom Pavilion in World Showcase.', 'character_meet', 1, 15, false),

-- Dining
('22222222-2222-2222-2222-222222222222', 'Le Cellier Steakhouse', 'Premium steakhouse serving Canadian-inspired cuisine including filet mignon and cheddar cheese soup in the Canada Pavilion.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Akershus Royal Banquet Hall', 'Character dining with Disney princesses serving Norwegian cuisine in a medieval castle setting in the Norway Pavilion.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'La Hacienda de San Angel', 'Waterfront Mexican dining with views of the World Showcase Lagoon and nightly fireworks in the Mexico Pavilion.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Monsieur Paul', 'Fine French dining on the second floor of the France Pavilion featuring classic French cuisine and an intimate atmosphere.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Teppan Edo', 'Teppanyaki-style Japanese restaurant where chefs prepare meals on a sizzling griddle in the Japan Pavilion.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Biergarten Restaurant', 'All-you-care-to-enjoy German buffet with live polka music and a festive Oktoberfest atmosphere in the Germany Pavilion.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Rose & Crown Dining Room', 'Traditional British pub and dining room serving fish and chips, shepherd''s pie, and ales in the United Kingdom Pavilion.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Garden Grill Restaurant', 'Rotating restaurant serving family-style harvest meals featuring Chip, Dale, and friends inside The Land Pavilion.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Space 220 Restaurant', 'Dine 220 miles above Earth in this immersive space-themed restaurant with panoramic views of the cosmos via floor-to-ceiling screens.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Coral Reef Restaurant', 'Dine alongside the massive aquarium at The Seas Pavilion watching dolphins and sea turtles while enjoying seafood.', 'dining', 1, 0, false),
('22222222-2222-2222-2222-222222222222', 'Via Napoli Ristorante e Pizzeria', 'Authentic Neapolitan pizza baked in wood-fired ovens imported from Italy, serving some of Disney World''s best pizza.', 'dining', 1, 0, false);

-- ============================================
-- HOLLYWOOD STUDIOS — All Attractions
-- ============================================
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
-- Star Wars: Galaxy's Edge
('33333333-3333-3333-3333-333333333333', 'Star Wars: Rise of the Resistance', 'Join the Resistance in an epic, massive-scale dark ride battle against the First Order featuring multiple ride systems, live actors, and stunning practical effects. Height: 40 inches.', 'ride', 4, 90, true),
('33333333-3333-3333-3333-333333333333', 'Millennium Falcon: Smugglers Run', 'Take the controls of the Millennium Falcon in a six-person crew as pilot, gunner, or engineer on a smuggling mission through hyperspace. Height: 38 inches.', 'ride', 3, 60, true),
('33333333-3333-3333-3333-333333333333', 'Star Tours - The Adventures Continue', 'Board a Starspeeder for a randomized 3D flight through Star Wars worlds with dozens of possible storyline combinations. Height: 40 inches.', 'ride', 3, 20, true),

-- Toy Story Land
('33333333-3333-3333-3333-333333333333', 'Slinky Dog Dash', 'Ride Slinky Dog on a fun family coaster winding through the oversized world of Toy Story Land with great views and smooth thrills. Height: 38 inches.', 'ride', 3, 65, true),
('33333333-3333-3333-3333-333333333333', 'Toy Story Mania!', 'Compete in carnival-style 4D interactive shooting games with Woody, Buzz, and friends across five mini-games. All ages.', 'ride', 1, 40, true),
('33333333-3333-3333-3333-333333333333', 'Alien Swirling Saucers', 'Spin through space in a toy flying saucer as the little green aliens from Toy Story pilot your ship in a whipping, spinning ride. Height: 32 inches.', 'ride', 2, 30, false),

-- Sunset Boulevard
('33333333-3333-3333-3333-333333333333', 'The Twilight Zone Tower of Terror', 'Plunge 13 stories in a haunted Hollywood Tower Hotel elevator through the Twilight Zone with randomized drop sequences. Height: 40 inches.', 'ride', 5, 50, true),
('33333333-3333-3333-3333-333333333333', 'Rock ''n'' Roller Coaster Starring Aerosmith', 'Launch from 0 to 57 mph in 2.8 seconds in a super-stretch limo on this indoor coaster with inversions and loops set to Aerosmith. Height: 48 inches.', 'ride', 5, 55, true),
('33333333-3333-3333-3333-333333333333', 'Fantasmic!', 'A spectacular 30-minute nighttime show in a 6,900-seat amphitheater featuring Mickey Mouse battling Disney villains with water screens, pyrotechnics, and live performers.', 'show', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Beauty and the Beast - Live on Stage', 'A full 30-minute Broadway-style musical performance featuring songs from Beauty and the Beast with elaborate costumes and sets.', 'show', 1, 0, false),

-- Hollywood & Echo Lake
('33333333-3333-3333-3333-333333333333', 'Mickey & Minnie''s Runaway Railway', 'Step through the screen into a Mickey Mouse cartoon for a wacky trackless 2.5D dark ride adventure at the Chinese Theatre.', 'ride', 2, 50, true),
('33333333-3333-3333-3333-333333333333', 'Indiana Jones Epic Stunt Spectacular!', 'A 30-minute live-action stunt show recreating iconic scenes from Raiders of the Lost Ark with real explosions, stunts, and audience participation.', 'show', 1, 0, true),
('33333333-3333-3333-3333-333333333333', 'For the First Time in Forever: A Frozen Sing-Along Celebration', 'An interactive 30-minute Frozen sing-along with on-screen lyrics, comedic hosts, and live appearances by Anna and Elsa.', 'show', 1, 10, true),
('33333333-3333-3333-3333-333333333333', 'The Little Mermaid - A Musical Adventure', 'Updated musical stage show featuring songs and characters from The Little Mermaid with live performers and special effects.', 'show', 1, 10, false),
('33333333-3333-3333-3333-333333333333', 'Disney Villains: Unfairly Ever After', 'A 15-minute villain-themed stage show featuring Maleficent, Cruella de Vil, Captain Hook, and the Magic Mirror.', 'show', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Wonderful World of Animation', 'A nighttime projection mapping show on the Chinese Theatre celebrating Disney and Pixar animation history.', 'show', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Mickey Shorts Theater', 'A 10-minute air-conditioned theater showing Mickey Mouse animated shorts with in-theater sensory effects.', 'show', 1, 5, false),
('33333333-3333-3333-3333-333333333333', 'Walt Disney Presents', 'A self-guided museum celebrating Walt Disney''s life and legacy with original artifacts, concept art, and a short film.', 'show', 1, 10, false),

-- Character Meets
('33333333-3333-3333-3333-333333333333', 'Meet Woody, Jessie, and Buzz in Toy Story Land', 'Meet Woody, Jessie, and Buzz Lightyear at their dedicated character greeting area in Toy Story Land.', 'character_meet', 1, 25, false),
('33333333-3333-3333-3333-333333333333', 'Meet Chewbacca in Galaxy''s Edge', 'Meet Chewbacca roaming through Batuu in Star Wars: Galaxy''s Edge.', 'character_meet', 1, 20, false),
('33333333-3333-3333-3333-333333333333', 'Meet Darth Vader', 'Face the Dark Lord of the Sith in a scheduled meet and greet near the Star Tours area.', 'character_meet', 1, 30, false),
('33333333-3333-3333-3333-333333333333', 'Green Army Drum Corps', 'Watch the Green Army Men from Toy Story march and perform drum routines through Toy Story Land.', 'show', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'First Order Searches for the Resistance', 'Watch Kylo Ren and First Order Stormtroopers conduct a hunt for Resistance fighters in Galaxy''s Edge.', 'show', 1, 0, false),

-- Dining
('33333333-3333-3333-3333-333333333333', 'Oga''s Cantina', 'Immersive Star Wars cantina bar with specialty cocktails, mocktails, and light snacks in Galaxy''s Edge. Reservations highly recommended.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', '50''s Prime Time Cafe', 'Retro 1950s diner where interactive servers enforce Mom''s rules while serving comfort food classics like pot roast and fried chicken.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Sci-Fi Dine-In Theater Restaurant', 'Dine in replica convertible cars facing a drive-in movie screen showing 1950s sci-fi B-movies while enjoying American comfort food.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'The Hollywood Brown Derby', 'Fine dining recreation of the legendary LA celebrity restaurant featuring contemporary American cuisine and celebrity caricatures.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Hollywood & Vine', 'Buffet-style character dining featuring Minnie''s Seasonal Dining with Disney characters in seasonal costumes all day.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Roundup Rodeo BBQ', 'Immersive Toy Story-themed all-you-can-eat BBQ restaurant in Toy Story Land with elaborate theming and family-style service.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Docking Bay 7 Food and Cargo', 'Star Wars-themed quick service in Galaxy''s Edge serving unique dishes like Endorian Fried Chicken Tip Yip.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Woody''s Lunch Box', 'Toy Story-themed counter service known for its iconic Lunch Box Tart, grilled cheese, and totchos in Toy Story Land.', 'dining', 1, 0, false),
('33333333-3333-3333-3333-333333333333', 'Ronto Roasters', 'Star Wars-themed quick service in Galaxy''s Edge famous for its Ronto Wrap with roasted meats cooked on a repurposed pod-racing engine.', 'dining', 1, 0, false);

-- ============================================
-- ANIMAL KINGDOM — All Attractions
-- ============================================
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
-- Pandora - The World of Avatar
('44444444-4444-4444-4444-444444444444', 'Avatar Flight of Passage', 'Soar on the back of a mountain banshee over the breathtaking alien world of Pandora on this stunning 3D flying simulator. Height: 44 inches.', 'ride', 4, 90, true),
('44444444-4444-4444-4444-444444444444', 'Na''vi River Journey', 'Float through the bioluminescent rainforests of Pandora on a gentle boat ride featuring the most advanced Audio-Animatronic figure ever created by Disney.', 'ride', 1, 55, true),

-- Africa
('44444444-4444-4444-4444-444444444444', 'Kilimanjaro Safaris', 'Explore the Harambe Wildlife Reserve on an open-air safari vehicle encountering real African wildlife including elephants, lions, giraffes, and hippos across 110 acres.', 'ride', 1, 35, true),
('44444444-4444-4444-4444-444444444444', 'Gorilla Falls Exploration Trail', 'Walk through lush habitats featuring Western lowland gorillas, hippos, meerkats, naked mole rats, exotic birds, and African wildlife.', 'show', 1, 5, false),
('44444444-4444-4444-4444-444444444444', 'Festival of the Lion King', 'A Broadway-caliber 30-minute show celebrating The Lion King with acrobats, stilt walkers, fire dancers, aerial performers, and beloved songs.', 'show', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Feathered Friends in Flight!', 'An outdoor show featuring exotic birds soaring overhead and demonstrating their natural behaviors with audience interaction.', 'show', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Wildlife Express Train', 'Ride a train from Africa to Rafiki''s Planet Watch for behind-the-scenes looks at Disney''s animal care and conservation efforts.', 'ride', 1, 10, false),
('44444444-4444-4444-4444-444444444444', 'Rafiki''s Planet Watch', 'Interactive conservation area featuring the Affection Section petting zoo, Animation Experience, and veterinary viewing windows.', 'show', 1, 10, false),

-- Asia
('44444444-4444-4444-4444-444444444444', 'Expedition Everest - Legend of the Forbidden Mountain', 'Brave the legend of the Yeti on a high-speed train ride through the Himalayas that includes a thrilling backward section and 80-foot drop. Height: 44 inches.', 'ride', 5, 40, true),
('44444444-4444-4444-4444-444444444444', 'Kali River Rapids', 'Navigate treacherous rapids on a 12-person whitewater raft through the rainforest, encountering waterfalls and illegal logging operations. You will get wet! Height: 38 inches.', 'ride', 3, 30, true),
('44444444-4444-4444-4444-444444444444', 'Maharajah Jungle Trek', 'Walk through the ruins of a Southeast Asian palace to see Komodo dragons, giant fruit bats, Bengal tigers, and exotic birds in naturalistic habitats.', 'show', 1, 5, false),

-- DinoLand U.S.A.
('44444444-4444-4444-4444-444444444444', 'DINOSAUR', 'Travel back in time to rescue an iguanodon before a catastrophic asteroid strikes in this dark, intense, and bumpy Time Rover ride. Height: 40 inches.', 'ride', 4, 25, true),
('44444444-4444-4444-4444-444444444444', 'TriceraTop Spin', 'Soar through the sky on a friendly triceratops in this Dumbo-style spinning ride with controllable height, perfect for younger guests.', 'ride', 1, 15, false),
('44444444-4444-4444-4444-444444444444', 'The Boneyard', 'An interactive dig site playground where kids can slide down prehistoric bones, explore caves, and uncover dinosaur fossils.', 'show', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Finding Nemo: The Big Blue... and Beyond!', 'A 25-minute musical show combining live performers with large-scale puppetry, projections, and special effects telling the story of Finding Nemo.', 'show', 1, 0, false),

-- Discovery Island
('44444444-4444-4444-4444-444444444444', 'It''s Tough to Be a Bug!', 'A hilarious 3D/4D film experience hosted by Flik from A Bug''s Life inside the Tree of Life theater with surprising in-seat effects.', 'show', 2, 15, false),
('44444444-4444-4444-4444-444444444444', 'Discovery Island Trails', 'Winding nature trails around the base of the Tree of Life with up-close views of the intricate animal carvings and live animal encounters.', 'show', 1, 5, false),
('44444444-4444-4444-4444-444444444444', 'Tree of Life Awakenings', 'After dark, the Tree of Life comes alive with stunning projected animal animations that flow across the tree''s surface in brief magical moments.', 'show', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Adventures with Kevin', 'Meet Kevin, the colorful larger-than-life bird from the film Up, as she roams Discovery Island interacting with guests.', 'character_meet', 1, 10, false),
('44444444-4444-4444-4444-444444444444', 'Winged Encounters - The Kingdom Takes Flight', 'Watch exotic macaws take flight overhead in a stunning free-flight demonstration along Discovery Island pathways.', 'show', 1, 0, false),

-- Character Meets
('44444444-4444-4444-4444-444444444444', 'Meet Favorite Disney Pals at Adventurers Outpost', 'Meet Mickey and Minnie Mouse in their safari explorer outfits at this dedicated character greeting location on Discovery Island.', 'character_meet', 1, 30, true),
('44444444-4444-4444-4444-444444444444', 'Meet Pocahontas at Discovery Island', 'Meet Pocahontas at her character greeting location on Discovery Island near the Flame Tree Barbecue area.', 'character_meet', 1, 15, false),
('44444444-4444-4444-4444-444444444444', 'Meet Timon and Rafiki in Africa', 'Meet Timon and Rafiki from The Lion King at character greeting spots near the Festival of the Lion King theater.', 'character_meet', 1, 15, false),

-- Dining
('44444444-4444-4444-4444-444444444444', 'Tusker House Restaurant', 'Character dining buffet featuring Donald Duck and friends in safari outfits, serving African-inspired cuisine in the village of Harambe.', 'dining', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Yak & Yeti Restaurant', 'Pan-Asian cuisine including wok-fried dishes, noodle bowls, and dim sum in a richly themed Himalayan village setting.', 'dining', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Satu''li Canteen', 'Pandora-themed quick service restaurant serving unique healthy bowls with grilled proteins, plant-based options, and Pandoran ale.', 'dining', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Flame Tree Barbecue', 'Open-air quick service serving smoked ribs, pulled pork, and brisket with beautiful waterfront seating overlooking Discovery River.', 'dining', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Rainforest Cafe', 'Immersive themed restaurant featuring a simulated rainforest with animatronic animals, thunderstorms, and American cuisine.', 'dining', 1, 0, false),
('44444444-4444-4444-4444-444444444444', 'Tiffins Restaurant', 'Disney''s signature fine dining restaurant celebrating the art of travel with globally-inspired cuisine and stunning artwork from Disney Imagineers.', 'dining', 1, 0, false);
