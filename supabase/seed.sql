insert into collections (slug, name, description, seo_title, seo_description, sort_order) values
('mastectomy-recovery-gifts','Mastectomy Recovery Gifts','Comfort after surgery','Mastectomy Recovery Gifts | Handmade Comfort Care Packages','Send a thoughtful handmade mastectomy recovery gift.',1),
('cancer-care-packages','Cancer Care Packages','Care when words feel hard','Cancer Care Packages | Handmade Gifts for Comfort & Support','Handmade gifts for comfort and support.',2),
('port-pillows','Port Pillows','Small support with big meaning','Port Pillows | Handmade Comfort Pillows for Treatment & Travel','Handmade port pillows for treatment and travel.',3),
('drain-holders','Drain Holders','Discreet practical support','Drain Holders | Handmade Surgical Recovery Gifts','Handmade drain holders for surgical recovery.',4),
('personalized-ornaments','Personalized Ornaments','Personalized memories that last','Personalized Handmade Ornaments | Dancing Bee Designs','Personalized handmade ornaments.',5),
('graduation-gifts','Graduation Gifts','Celebrate the next chapter','Personalized Graduation Gifts & Ornaments | Dancing Bee Designs','Personalized graduation gifts and ornaments.',6)
on conflict (slug) do nothing;

insert into products (slug,title,subtitle,description,long_description,price,featured,bestseller,donation_eligible,free_shipping,image_url,tags,seo_keywords) values
('deluxe-mastectomy-recovery-gift-set','Deluxe Mastectomy Recovery Gift Set — Handmade Comfort Care Package','Heart pillows, port pillow, drain holders, tote, reusable packs, note cards, and ribbon keepsake.','A complete handmade care package for someone recovering from mastectomy, reconstruction, or lumpectomy.','Send something useful, comforting, and personal without worrying whether you chose the right thing.',115,true,true,true,true,'https://i.etsystatic.com/7513710/r/il/b12d32/4312323192/il_fullxfull.4312323192_kkpo.jpg',array['mastectomy','recovery','cancer care','gift set'],array['mastectomy recovery gifts','breast cancer surgery gifts','cancer care package']),
('minky-port-pillow-for-seatbelt-chemo-pacemaker-surgery-recovery','Minky Port Pillow for Seatbelt — Chemo, Pacemaker & Surgery Recovery','Small, soft cushioning for treatment days and travel.','A handmade minky pillow that attaches to a seatbelt with hook-and-loop tape to cushion the chest area.','A practical little comfort item for chemo ports, pacemakers, heart surgery, and recovery travel.',9,true,true,true,true,'https://i.etsystatic.com/7513710/r/il/50065d/5541866263/il_fullxfull.5541866263_n6hi.jpg',array['port pillow','chemo port','pacemaker'],array['port pillow','chemo port pillow','seatbelt cushion']),
('personalized-graduation-cap-ornament-black-and-gold','Personalized Graduation Cap Ornament — Black & Gold Keepsake','A small handmade milestone gift for the next chapter.','A personalized graduation ornament for high school, college, masters, and doctoral celebrations.','Celebrate the person, the school colors, and the milestone with a keepsake that lasts beyond graduation day.',15,true,false,false,false,'/images/ornament.svg',array['graduation','ornament','personalized'],array['personalized graduation ornament','graduation gifts'])
on conflict (slug) do nothing;

insert into reviews (source, reviewer_name, rating, excerpt, featured, published) values
('etsy','Etsy buyer',5,'Thoughtful and encouraging choice.',true,true),
('etsy','Taylor',5,'Gift arrived very quickly.',true,true),
('etsy','Nadine',5,'Communication was great.',true,true),
('etsy','Kristin',5,'Made the trip home much easier.',true,true);

insert into homepage_sections (key,title,copy,data,enabled) values
('hero','Handmade gifts for healing, comfort, and meaningful moments.','Thoughtful recovery care packages, port pillows, keepsakes, and personalized gifts made to help people feel loved when words are not enough.','{}',true),
('donation','Comfort that keeps going','Port pillow giving adds another layer of care.','{"donated_port_pillows":1739,"as_of":"2026-03-31"}',true)
on conflict (key) do update set title = excluded.title, copy = excluded.copy, data = excluded.data;
