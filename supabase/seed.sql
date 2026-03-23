-- Insert Parks
INSERT INTO parks (id, name, slug, description, image_url, map_url, color) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Magic Kingdom', 'magic-kingdom', 'The most magical place on Earth featuring classic attractions, enchanting fireworks, and beloved Disney characters. Home to Cinderella Castle and six themed lands.', 'https://images.unsplash.com/photo-1436491865332-7a61a109db56?w=800', '', '#1e40af'),
  ('22222222-2222-2222-2222-222222222222', 'EPCOT', 'epcot', 'Explore future technologies and world cultures across two distinct areas: World Celebration and World Showcase with pavilions representing 11 countries.', 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800', '', '#7c3aed'),
  ('33333333-3333-3333-3333-333333333333', 'Hollywood Studios', 'hollywood-studios', 'Lights, camera, action! Experience thrilling attractions inspired by movies, TV shows, and music. Home to Star Wars: Galaxy''s Edge and Toy Story Land.', 'https://images.unsplash.com/photo-1575375082449-65e7e1f6e3f8?w=800', '', '#dc2626'),
  ('44444444-4444-4444-4444-444444444444', 'Animal Kingdom', 'animal-kingdom', 'Explore the magic of nature with thrilling adventures, exotic animals, and the awe-inspiring world of Pandora. Disney''s largest theme park.', 'https://images.unsplash.com/photo-1564429238961-bf8e8beda01e?w=800', '', '#16a34a');

-- Magic Kingdom Attractions
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Space Mountain', 'Blast off on a thrilling rocket ride through the dark reaches of outer space.', 'ride', 4, 55, true),
  ('11111111-1111-1111-1111-111111111111', 'Big Thunder Mountain Railroad', 'Hold on to your hats for a wild ride through an abandoned mine.', 'ride', 3, 45, true),
  ('11111111-1111-1111-1111-111111111111', 'Splash Mountain', 'Take a musical journey with Br''er Rabbit culminating in a thrilling 5-story drop.', 'ride', 4, 60, true),
  ('11111111-1111-1111-1111-111111111111', 'Pirates of the Caribbean', 'Set sail on a swashbuckling voyage through pirate-infested waters.', 'ride', 1, 25, false),
  ('11111111-1111-1111-1111-111111111111', 'Haunted Mansion', 'Tour a haunted estate filled with 999 happy haunts.', 'ride', 2, 30, true),
  ('11111111-1111-1111-1111-111111111111', 'Seven Dwarfs Mine Train', 'Race through the diamond mine where the Seven Dwarfs work.', 'ride', 3, 75, true),
  ('11111111-1111-1111-1111-111111111111', 'TRON Lightcycle Run', 'Launch into the Grid on one of the fastest coasters at Walt Disney World.', 'ride', 5, 90, true),
  ('11111111-1111-1111-1111-111111111111', 'Jungle Cruise', 'Embark on a tongue-in-cheek cruise through exotic rivers of the world.', 'ride', 1, 35, true),
  ('11111111-1111-1111-1111-111111111111', 'it''s a small world', 'Cruise through a whimsical world of singing dolls representing countries around the globe.', 'ride', 1, 15, false),
  ('11111111-1111-1111-1111-111111111111', 'Mickey''s PhilharMagic', 'A 3D concert experience starring Donald Duck and classic Disney characters.', 'show', 1, 10, false),
  ('11111111-1111-1111-1111-111111111111', 'Buzz Lightyear''s Space Ranger Spin', 'Help Buzz Lightyear defeat Emperor Zurg in this interactive shooting ride.', 'ride', 1, 25, true),
  ('11111111-1111-1111-1111-111111111111', 'Meet Mickey at Town Square Theater', 'Meet Mickey Mouse in his magician outfit at Town Square.', 'character_meet', 1, 40, true),
  ('11111111-1111-1111-1111-111111111111', 'Be Our Guest Restaurant', 'Dine in the enchanted castle from Beauty and the Beast.', 'dining', 1, 0, false),
  ('11111111-1111-1111-1111-111111111111', 'The Crystal Palace', 'Buffet dining with Winnie the Pooh and friends.', 'dining', 1, 0, false),
  ('11111111-1111-1111-1111-111111111111', 'Peter Pan''s Flight', 'Soar over London and Never Land with Peter Pan.', 'ride', 1, 60, true);

-- EPCOT Attractions
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
  ('22222222-2222-2222-2222-222222222222', 'Guardians of the Galaxy: Cosmic Rewind', 'A thrilling reverse-launch indoor coaster through the cosmos.', 'ride', 5, 90, true),
  ('22222222-2222-2222-2222-222222222222', 'Test Track', 'Design your own virtual concept car and take it for a high-speed spin.', 'ride', 4, 60, true),
  ('22222222-2222-2222-2222-222222222222', 'Frozen Ever After', 'Cruise through the kingdom of Arendelle with Anna, Elsa, and friends.', 'ride', 2, 55, true),
  ('22222222-2222-2222-2222-222222222222', 'Soarin'' Around the World', 'Experience a breathtaking hang-gliding flight over world landmarks.', 'ride', 2, 45, true),
  ('22222222-2222-2222-2222-222222222222', 'Spaceship Earth', 'Journey through the history of human communication inside the iconic geodesphere.', 'ride', 1, 20, false),
  ('22222222-2222-2222-2222-222222222222', 'Remy''s Ratatouille Adventure', 'Shrink down to the size of Chef Remy for a 4D chase through Gusteau''s restaurant.', 'ride', 2, 50, true),
  ('22222222-2222-2222-2222-222222222222', 'Living with the Land', 'Cruise through greenhouses and learn about innovative farming techniques.', 'ride', 1, 15, false),
  ('22222222-2222-2222-2222-222222222222', 'The Seas with Nemo & Friends', 'Journey under the sea with Nemo in this gentle dark ride.', 'ride', 1, 15, false),
  ('22222222-2222-2222-2222-222222222222', 'Journey of Water', 'Explore an outdoor trail inspired by Moana and the magic of water.', 'show', 1, 20, false),
  ('22222222-2222-2222-2222-222222222222', 'Le Cellier Steakhouse', 'Premium steakhouse in the Canada pavilion of World Showcase.', 'dining', 1, 0, false),
  ('22222222-2222-2222-2222-222222222222', 'Akershus Royal Banquet Hall', 'Character dining with Disney princesses in Norway.', 'dining', 1, 0, false),
  ('22222222-2222-2222-2222-222222222222', 'Mission: SPACE', 'Experience the forces of a rocket launch to Mars.', 'ride', 5, 25, true);

-- Hollywood Studios Attractions
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
  ('33333333-3333-3333-3333-333333333333', 'Star Wars: Rise of the Resistance', 'Join the Resistance in an epic battle against the First Order.', 'ride', 4, 90, true),
  ('33333333-3333-3333-3333-333333333333', 'Millennium Falcon: Smugglers Run', 'Take the controls of the fastest ship in the galaxy.', 'ride', 3, 60, true),
  ('33333333-3333-3333-3333-333333333333', 'Tower of Terror', 'Plunge 13 stories in a haunted hotel elevator.', 'ride', 5, 50, true),
  ('33333333-3333-3333-3333-333333333333', 'Rock ''n'' Roller Coaster', 'Launch from 0 to 57 mph in a super-stretch limo set to Aerosmith.', 'ride', 5, 55, true),
  ('33333333-3333-3333-3333-333333333333', 'Slinky Dog Dash', 'Ride Slinky Dog on a fun family coaster through Toy Story Land.', 'ride', 3, 65, true),
  ('33333333-3333-3333-3333-333333333333', 'Toy Story Mania!', 'Compete in carnival-style 4D shooting games with Toy Story characters.', 'ride', 1, 40, true),
  ('33333333-3333-3333-3333-333333333333', 'Mickey & Minnie''s Runaway Railway', 'Step into a Mickey Mouse cartoon for a wacky trackless adventure.', 'ride', 2, 50, true),
  ('33333333-3333-3333-3333-333333333333', 'Alien Swirling Saucers', 'Spin through space in a toy flying saucer piloted by aliens.', 'ride', 2, 30, false),
  ('33333333-3333-3333-3333-333333333333', 'Star Tours – The Adventures Continue', 'Board a Starspeeder for a 3D flight through Star Wars worlds.', 'ride', 3, 20, true),
  ('33333333-3333-3333-3333-333333333333', 'Fantasmic!', 'Spectacular nighttime show with fireworks, water, and projections.', 'show', 1, 0, false),
  ('33333333-3333-3333-3333-333333333333', 'Indiana Jones Epic Stunt Spectacular', 'Live action stunt show recreating scenes from Raiders of the Lost Ark.', 'show', 1, 0, false),
  ('33333333-3333-3333-3333-333333333333', 'Oga''s Cantina', 'Themed bar in Star Wars: Galaxy''s Edge serving exotic beverages.', 'dining', 1, 0, false),
  ('33333333-3333-3333-3333-333333333333', '50''s Prime Time Café', 'Retro diner where servers enforce Mom''s rules — eat your vegetables!', 'dining', 1, 0, false);

-- Animal Kingdom Attractions
INSERT INTO attractions (park_id, name, description, type, thrill_level, wait_time_avg, is_fastpass) VALUES
  ('44444444-4444-4444-4444-444444444444', 'Avatar Flight of Passage', 'Soar on the back of a mountain banshee over the breathtaking world of Pandora.', 'ride', 4, 90, true),
  ('44444444-4444-4444-4444-444444444444', 'Na''vi River Journey', 'Float through the bioluminescent rainforests of Pandora.', 'ride', 1, 55, true),
  ('44444444-4444-4444-4444-444444444444', 'Expedition Everest', 'Brave the legend of the Yeti on a high-speed train ride through the Himalayas.', 'ride', 5, 40, true),
  ('44444444-4444-4444-4444-444444444444', 'Kilimanjaro Safaris', 'Explore the African savanna on an open-air vehicle safari.', 'ride', 1, 35, true),
  ('44444444-4444-4444-4444-444444444444', 'Kali River Rapids', 'Navigate treacherous rapids on a whitewater raft adventure.', 'ride', 3, 30, true),
  ('44444444-4444-4444-4444-444444444444', 'DINOSAUR', 'Travel back in time to rescue an iguanodon before an asteroid strikes.', 'ride', 4, 25, true),
  ('44444444-4444-4444-4444-444444444444', 'Gorilla Falls Exploration Trail', 'Walk through habitats with gorillas, hippos, and exotic birds.', 'show', 1, 5, false),
  ('44444444-4444-4444-4444-444444444444', 'Festival of the Lion King', 'Broadway-style show celebrating The Lion King with acrobats and music.', 'show', 1, 0, false),
  ('44444444-4444-4444-4444-444444444444', 'Finding Nemo: The Big Blue... and Beyond!', 'Musical show featuring Finding Nemo characters with puppetry and special effects.', 'show', 1, 0, false),
  ('44444444-4444-4444-4444-444444444444', 'Tree of Life', 'The iconic 145-foot tall tree with intricate animal carvings.', 'show', 1, 5, false),
  ('44444444-4444-4444-4444-444444444444', 'Tusker House Restaurant', 'Character dining with Donald Duck''s Safari in Africa.', 'dining', 1, 0, false),
  ('44444444-4444-4444-4444-444444444444', 'Yak & Yeti Restaurant', 'Pan-Asian cuisine in a Himalayan village setting.', 'dining', 1, 0, false),
  ('44444444-4444-4444-4444-444444444444', 'Meet Favorite Disney Pals at Adventurers Outpost', 'Meet Mickey and Minnie in safari outfits.', 'character_meet', 1, 30, true);
