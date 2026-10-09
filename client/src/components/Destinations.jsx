import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ArrowRight, Eye, Sparkles, Search, Phone, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { fetchDestinations } from '../services/api';
import { translations } from '../utils/translations';
import DestinationModal from './DestinationModal';

const FALLBACK_DESTINATIONS = [
  // MP Destinations (From Indore & MP)
  {
    _id: 'mp_ujjain',
    title: 'उज्जैन महाकालेश्वर ज्योतिर्लिंग दर्शन (इंदौर से ~55 किमी)',
    titleEn: 'Ujjain Mahakaleshwar Temple Tour (~55 KM from Indore)',
    category: 'MP',
    image: '/images/destinations/ujjain.jpg',
    duration: '1 - 2 दिन',
    durationEn: '1 - 2 Days',
    location: 'Ujjain, Madhya Pradesh',
    rating: 4.95,
    reviewsCount: 128,
    description: 'भगवान शिव के 12 ज्योतिर्लिंगों में से एक, जहाँ प्रसिद्ध भस्म आरती, काल भैरव मंदिर, महाकाल लोक गलियारा और क्षिप्रा नदी के पवित्र घाट स्थित हैं।',
    descriptionEn: 'Visit one of the 12 sacred Jyotirlingas, famous for Bhasma Aarti, Kal Bhairav temple, Mahakal Lok corridor, and Shipra River Ghats.',
    highlights: ['महाकालेश्वर भस्म आरती दर्शन', 'महाकाल लोक कॉरिडोर', 'काल भैरव मंदिर दर्शन', 'क्षिप्रा नदी रामघाट संध्या आरती'],
    inclusions: ['एसी कार एवं अनुभवी चालक', 'वीआईपी मंदिर दर्शन सहायता', 'होटल पिकअप एवं ड्रॉप', '100% सैनिटाइज्ड वाहन'],
    featured: true
  },
  {
    _id: 'mp_omkareshwar',
    title: 'ओंकारेश्वर ज्योतिर्लिंग दर्शन (इंदौर से ~80 किमी)',
    titleEn: 'Omkareshwar Jyotirlinga Tour (~80 KM from Indore)',
    category: 'MP',
    image: '/images/destinations/omkareshwar.jpg',
    duration: '1 - 2 दिन',
    durationEn: '1 - 2 Days',
    location: 'Khandwa / Omkareshwar, MP',
    rating: 4.9,
    reviewsCount: 94,
    description: 'पवित्र नर्मदा नदी के तट पर "Om" आकार के द्वीप पर बसा प्रसिद्ध ज्योतिर्लिंग तीर्थ, जहाँ ओंकारेश्वर एवं ममलेश्वर मंदिर स्थित हैं।',
    descriptionEn: 'Holy island pilgrimage on the banks of Narmada river housing Omkareshwar and Mamleshwar Jyotirlingas.',
    highlights: ['ओंकारेश्वर एवं ममलेश्वर ज्योतिर्लिंग', 'नर्मदा नदी नौका विहार (Boat Ride)', 'नर्मदा परिक्रमा संकल्प', 'ऋणमुक्तेश्वर महादेव'],
    inclusions: ['एसी सेडान/एसयूवी कार', 'अनुभवी local ड्राइवर', 'डोरस्टेप पिकअप', 'टोल एवं पार्किंग टैक्स शामिल'],
    featured: true
  },
  {
    _id: 'mp_maheshwar',
    title: 'महेश्वर सहस्त्रधारा एवं होलकर किला दर्शन (~95 किमी)',
    titleEn: 'Maheshwar Fort & Narmada Ghats Tour (~95 KM from Indore)',
    category: 'MP',
    image: '/images/destinations/maheshwar_waterfall.jpg',
    duration: '1 दिन',
    durationEn: '1 Day Trip',
    location: 'Khargone / Maheshwar, MP',
    rating: 4.85,
    reviewsCount: 76,
    description: 'सहस्त्रधारा नर्मदा घाटों, रानी अहिल्याबाई होलकर के भव्य किले की वास्तुकला, महेश्वरी साड़ी बुनाई केंद्रों और पवित्र मंदिरों के लिए प्रसिद्ध।',
    descriptionEn: 'Famous for Sahastradhara Narmada Ghats, Ahilya Fort architecture, Ahilyabai temple, and handloom Maheshwari sarees.',
    highlights: ['अहिल्याबाई होलकर किला एवं महल', 'सहस्त्रधारा नर्मदा नदी घाट', 'महेश्वरी साड़ी बुनाई केंद्र', 'राजराजेश्वर मंदिर'],
    inclusions: ['एसी कार सुविधा', 'चालक भत्ता शामिल', 'इन्दौर से सीधी कार', 'टोल टैक्स शामिल'],
    featured: false
  },
  {
    _id: 'mp_mandu',
    title: 'मांडू ऐतिहासिक महल एवं जहाज महल दर्शन (~100 किमी)',
    titleEn: 'Mandu Heritage Forts Tour (~100 KM from Indore)',
    category: 'MP',
    image: '/images/destinations/mandu.jpg',
    duration: '1 - 2 दिन',
    durationEn: '1 - 2 Days',
    location: 'Dhar / Mandu, MP',
    rating: 4.9,
    reviewsCount: 82,
    description: 'जहाज महल, हिंडोला महल, बाज बहादुर महल और रानी रूपमती मंडप जैसी अद्भूत वास्तुकला के चमत्कारों से भरा एक ऐतिहासिक आनंद नगरी।',
    descriptionEn: 'City of Joy filled with architectural marvels including Jahaz Mahal, Hindola Mahal, and Rani Roopmati Pavilion.',
    highlights: ['जहाज महल एवं कपूर तालाब', 'हिंडोला महल एवं जामी मस्जिद', 'रानी रूपमती मंडप व्यू पॉइंट', 'बाज बहादुर पैलेस'],
    inclusions: ['निजी एसी टैक्सी कार', 'गाइड गाइडेंस सहायता', 'होटल पिकअप/ड्रॉप', '24 घंटे कस्टमर सपोर्ट'],
    featured: true
  },
  {
    _id: 'mp_baglamukhi',
    title: 'तंत्र श्री बगलामुखी माता मंदिर नलखेड़ा दर्शन (~165 किमी)',
    titleEn: 'Shree Baglamukhi Mata Temple Nalkheda Tour (~165 KM)',
    category: 'MP',
    image: '/images/destinations/baglamukhi.jpg',
    duration: '1 दिन',
    durationEn: '1 Day Trip',
    location: 'Agar Malwa / Nalkheda, MP',
    rating: 4.98,
    reviewsCount: 110,
    description: 'लखुंदर नदी तट पर स्थित तंत्र साधना हेतु अति शक्तिशाली एवं प्राचीन सिद्ध शक्तिपीठ माँ बगलामुखी मंदिर।',
    descriptionEn: 'One of the most powerful and ancient Tantrik Shaktipeeths dedicated to Goddess Baglamukhi on Lakhundar river.',
    highlights: ['माँ बगलामुखी मूल विग्रह दर्शन', 'हवन एवं विशेष अनुष्ठान', 'लखुंदर नदी तट क्षेत्र', 'भैरव बाबा मंदिर'],
    inclusions: ['सुरक्षित एसी कार', 'अनुभवी धार्मिक टूर ड्राइवर', 'डोर-टू-डोर सेवा', 'टोल एवं पार्किंग टैक्स'],
    featured: true
  },
  {
    _id: 'mp_sanwariya_seth',
    title: 'साँवरिया सेठ मंडफिया मंदिर दर्शन (~240 किमी)',
    titleEn: 'Sanwariya Seth Mandafiya Temple Tour (~240 KM)',
    category: 'MP',
    image: '/images/destinations/sanwariya.jpg',
    duration: '1 - 2 दिन',
    durationEn: '1 - 2 Days',
    location: 'Chittorgarh / Rajasthan Border',
    rating: 4.92,
    reviewsCount: 98,
    description: 'राजस्थान सीमा के पास मंडफिया में स्थित भगवान श्रीकृष्ण साँवरिया सेठ का भव्य मंदिर, जहाँ देश भर से भक्त दर्शन हेतु आते हैं।',
    descriptionEn: 'Renowned temple of Sanwariya Seth (Lord Krishna) near MP-Rajasthan border, hugely famous among merchants and devotees.',
    highlights: ['साँवरिया सेठ भव्य दर्शन', 'चित्तौड़गढ़ किला भ्रमण विकल्प', 'महाआरती एवं भोग प्रसाद', 'आरामदायक राजमार्ग यात्रा'],
    inclusions: ['हाइवे स्पेशल एसी कार', 'निःशुल्क समाचार पत्र एवं जीपीएस', 'अनुभवी हाइवे ड्राइवर', '24 घंटे सपोर्ट'],
    featured: false
  },
  {
    _id: 'mp_khajuraho',
    title: 'खजुराहो यूनेस्को विश्व धरोहर मंदिर दर्शन (~385 किमी)',
    titleEn: 'Khajuraho UNESCO World Heritage Temples Tour',
    category: 'MP',
    image: '/images/destinations/khajuraho.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Chhatarpur, MP',
    rating: 4.95,
    reviewsCount: 140,
    description: 'अपनी अनूठी मध्यकालीन नागरा शैली की सुंदर मूर्तिकला और वास्तुकला वाले विश्व प्रसिद्ध यूनेस्को मंदिर समूह।',
    descriptionEn: 'World famous UNESCO Heritage site renowned for Nagara-style architecture and intricate stone carvings.',
    highlights: ['कंदरिया महादेव मंदिर', 'पश्चिमी मंदिर समूह', 'लाइट एंड साउंड शो', 'पन्ना राष्ट्रीय उद्यान विकल्प'],
    inclusions: ['लक्जरी सेडान/एसयूवी', '3-स्टार / 4-स्टार होटल स्टे', 'गाइड सहायता', 'ब्रेकफास्ट शामिल'],
    featured: true
  },
  {
    _id: 'mp_salkanpur',
    title: 'सलकनपुर बिजासन माता शक्तिपीठ दर्शन (~135 किमी)',
    titleEn: 'Salkanpur Bijasan Mata Shaktipeeth Tour (~135 KM)',
    category: 'MP',
    image: '/images/destinations/salkanpur.jpg',
    duration: '1 दिन',
    durationEn: '1 Day Trip',
    location: 'Sehore / Salkanpur, MP',
    rating: 4.88,
    reviewsCount: 65,
    description: 'गिनौरगढ़ के पास विंध्याचल पहाड़ियों पर स्थित माँ दुर्गा बिजासन देवी का प्रसिद्ध एवं भव्य शक्तिपीठ मंदिर।',
    descriptionEn: 'Famous Shaktipeeth of Goddess Durga situated on a high hill surrounded by Vindhyanchal forests near Sehore.',
    highlights: ['बिजासन माता भव्य मंदिर', 'रोपवे (Cable Car) अनुभव', '800+ सीढ़ियां पैदल मार्ग', 'पहाड़ी प्राकृतिक सौंदर्य'],
    inclusions: ['एसी कार एवं ड्राइवर', 'इंदौर/भोपाल पिकअप', 'टोल एवं पार्किंग', 'जीपीएस ट्रैकिंग कार'],
    featured: false
  },
  {
    _id: 'mp_indore_local',
    title: 'खजराना गणेश एवं पितृ पर्वत इंदौर स्थानीय दर्शन',
    titleEn: 'Khajrana Ganesh & Pitra Parvat Indore Local Tour',
    category: 'MP',
    image: '/images/destinations/khajrana.jpg',
    duration: '1 दिन (लोकल इंदौर)',
    durationEn: '1 Day Local Indore',
    location: 'Indore, Madhya Pradesh',
    rating: 4.9,
    reviewsCount: 120,
    description: 'इंदौर शहर के भीतर प्रसिद्ध खजराना गणेश मंदिर, पितृ पर्वत हनुमान प्रतिमा, कांच मंदिर एवं छप्पन दुकान स्ट्रीट फूड यात्रा।',
    descriptionEn: 'Explore Indore city sacred spots including Khajrana Ganesh, Pitra Parvat Hanuman statue, Kanch Mandir, and Sarafa night market.',
    highlights: ['खजराना गणेश मंदिर दर्शन', 'पितृ पर्वत 66 फीट हनुमान जी प्रतिमा', 'कांच मंदिर एवं राजवाड़ा', 'छप्पन दुकान एवं सराफा फूड टूल'],
    inclusions: ['लोकल एसी कार (8 घंटे / 80 किमी)', 'अनुभवी लोकल ड्राइवर', 'पिकअप एवं ड्रॉप', 'निःशुल्क समाचार पत्र'],
    featured: true
  },

  // Top 20 India Sacred Pilgrimages & Tour Destinations
  {
    _id: 'ind_vNS',
    title: 'श्री काशी विश्वनाथ मंदिर एवं वाराणसी गंगा आरती',
    titleEn: 'Shree Kashi Vishwanath & Varanasi Ganga Aarti Tour',
    category: 'India',
    image: '/images/destinations/varanasi.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Varanasi, Uttar Pradesh',
    rating: 4.98,
    reviewsCount: 210,
    description: 'गंगा नदी के तट पर बसा भारत का आध्यात्मिक केंद्र, जो काशी विश्वनाथ ज्योतिर्लिंग, भव्य संध्या गंगा आरती और सारनाथ हेतु प्रसिद्ध है।',
    descriptionEn: 'Spiritual heart of India on holy river Ganga, world famous for Kashi Vishwanath Temple, Dashashwamedh Ganga Aarti & Sarnath.',
    highlights: ['काशी विश्वनाथ ज्योतिर्लिंग कॉरिडोर', 'दशाश्वमेध घाट संध्या गंगा आरती', 'सारनाथ बुद्ध स्तूप', 'गंगा नदी नौका विहार'],
    inclusions: ['4-Star होटल स्टे', 'प्राइवेट एसी कार', 'वीआईपी दर्शन सहायता', 'दैनिक नाश्ता शामिल'],
    featured: true
  },
  {
    _id: 'ind_shirdi',
    title: 'शिरडी साई बाबा मंदिर एवं शनि शिंगणापुर धाम',
    titleEn: 'Shirdi Sai Baba Temple & Shani Shingnapur Tour',
    category: 'India',
    image: '/images/destinations/shirdi.jpg',
    duration: '2 - 3 दिन',
    durationEn: '2 - 3 Days',
    location: 'Shirdi, Maharashtra',
    rating: 4.95,
    reviewsCount: 185,
    description: 'संत साई बाबा का पवित्र धाम शिरडी, जहाँ हर धर्म के लाखों श्रद्धालु श्रद्धा और सबुरी के साथ दर्शन हेतु पधारते हैं।',
    descriptionEn: 'Sacred abode of Shirdi Sai Baba visited by millions of devotees, including Shani Shingnapur pilgrimage.',
    highlights: ['साई बाबा समाधि मंदिर दर्शन', 'द्वारकामाई एवं चावड़ी', 'शनि शिंगणापुर मंदिर दर्शन', 'साई प्रसादालय'],
    inclusions: ['एसी कार एवं चालक', 'होटल स्टे', 'वीआईपी दर्शन पास सहायता', '24 घंटे सहायता'],
    featured: true
  },
  {
    _id: 'ind_tirupati',
    title: 'तिरुपति बालाजी / तिरुमला वेंकटेश्वर मंदिर दर्शन',
    titleEn: 'Tirupati Balaji Venkateswara Temple Tour',
    category: 'India',
    image: '/images/destinations/tirupati.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Tirupati, Andhra Pradesh',
    rating: 4.97,
    reviewsCount: 240,
    description: 'दुनिया के सबसे समृद्ध एवं प्रसिद्ध पवित्र पहाड़ी मंदिरों में से एक, जहाँ भगवान वेंकटेश्वर बालाजी का भव्य धाम स्थित है।',
    descriptionEn: 'One of the wealthiest and most visited hilltop temples in the world dedicated to Lord Venkateswara.',
    highlights: ['तिरुमला बालाजी वीआईपी श्रीवारी दर्शन', 'पद्मावती मंदिर तिरुचानूर', 'कपिला थीर्थम', 'प्रसिद्ध लड्डू प्रसादम'],
    inclusions: ['एयरपोर्ट कार ट्रांसफर', 'लक्जरी होटल', 'दर्शन टिकट पास गाइडेंस', 'एसी कार'],
    featured: true
  },
  {
    _id: 'ind_vaishnodevi',
    title: 'वैष्णो देवी मंदिर कटरा दर्शन पैकेज',
    titleEn: 'Vaishno Devi Temple Katra Tour',
    category: 'India',
    image: '/images/destinations/vaishnodevi.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Katra, Jammu & Kashmir',
    rating: 4.96,
    reviewsCount: 195,
    description: 'त्रिकूट पर्वत की पवित्र गुफाओं में स्थित माँ वैष्णो देवी शक्तिपीठ, जहाँ "जय माता दी" के जयकारों के साथ भक्त दर्शन करते हैं।',
    descriptionEn: 'Holy cave shrine of Goddess Vaishno Devi located in Trikuta Mountains in Jammu & Kashmir.',
    highlights: ['बाणगंगा एवं चरण पादुका', 'अर्धकुंवारी गुफा दर्शन', 'पवित्र भवन एवं भैरव बाबा मंदिर', 'हेलीकॉप्टर / बैटरी कार विकल्प'],
    inclusions: ['जम्मू कटरा कार ट्रांसफर', 'होटल स्टे', 'पर्ची पास सहायता', 'ड्राइवर सहायता'],
    featured: true
  },
  {
    _id: 'ind_golden_temple',
    title: 'स्वर्ण मंदिर (हरमंदिर साहिब) अमृतसर एवं वाघा बॉर्डर',
    titleEn: 'Golden Temple Amritsar & Wagah Border Tour',
    category: 'India',
    image: '/images/destinations/golden_temple.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Amritsar, Punjab',
    rating: 4.98,
    reviewsCount: 160,
    description: 'सिख धर्म का सर्वोच्च आध्यात्मिक केंद्र स्वर्ण मंदिर, सरोवर, विशाल गुरु का लंगर और जलियांवाला बाग व अटारी-वाघा बॉर्डर।',
    descriptionEn: 'Holiest Gurdwara of Sikhism known for its golden architecture, sacred pool, community kitchen, and Wagah Border.',
    highlights: ['श्री हरमंदिर साहिब दर्शन', 'पवित्र लंगर सेवा', 'जलियांवाला बाग स्मारक', 'वाघा बॉर्डर परेड समारोह'],
    inclusions: ['4-Star होटल', 'प्राइवेट एसी कार', 'अमृतसर लोकल टूर', 'नाश्ता शामिल'],
    featured: false
  },
  {
    _id: 'ind_kedarnath',
    title: 'केदारनाथ मंदिर चार धाम यात्रा (उत्तराखंड)',
    titleEn: 'Kedarnath Temple Pilgrimage Tour',
    category: 'India',
    image: '/images/destinations/kedarnath.jpg',
    duration: '5 - 6 दिन',
    durationEn: '5 - 6 Days',
    location: 'Rudraprayag, Uttarakhand',
    rating: 4.99,
    reviewsCount: 310,
    description: 'हिमालय की केदार घाटी में मंदाकिनी नदी तट पर स्थित भगवान शिव का सर्वोच्च ज्योतिर्लिंग एवं चार धाम तीर्थ।',
    descriptionEn: 'Himalayan temple of Lord Shiva, one of the 12 Jyotirlingas and core part of Char Dham Yatra.',
    highlights: ['केदारनाथ ज्योतिर्लिंग दर्शन', 'भैरवनाथ मंदिर', 'गौरीकुंड पैदल/हेलीकॉप्टर मार्ग', 'हिमालयी पर्वत श्रृंखलाएं'],
    inclusions: ['हरिद्वार/ऋषिकेश कार ट्रांसफर', 'होटल एवं कॉटेज स्टे', 'बायोमेट्रिक पास सहायता', '24 घंटे गाइड सपोर्ट'],
    featured: true
  },
  {
    _id: 'ind_badrinath',
    title: 'बद्रीनाथ मंदिर उत्तर भारत चार धाम तीर्थ',
    titleEn: 'Badrinath Temple Char Dham Tour',
    category: 'India',
    image: '/images/destinations/badrinath.jpg',
    duration: '5 - 6 दिन',
    durationEn: '5 - 6 Days',
    location: 'Chamoli, Uttarakhand',
    rating: 4.96,
    reviewsCount: 175,
    description: 'अलकनंदा नदी तट पर नर और नारायण पर्वतों के बीच स्थित भगवान विष्णु का अति पवित्र धाम।',
    descriptionEn: 'Sacred temple of Lord Vishnu situated between Nar and Narayana mountain ranges.',
    highlights: ['बद्रीनाथ मंदिर दर्शन', 'तप्त कुंड स्नान', 'माना गाँव (भारत का प्रथम गाँव)', 'व्यास गुफा एवं सरस्वती नदी'],
    inclusions: ['पहाड़ी स्पेशल एसी कार', 'होटल स्टे', 'टोल एवं परमिट', 'चालक सहायता'],
    featured: false
  },
  {
    _id: 'ind_ayodhya',
    title: 'श्री राम जन्मभूमि मंदिर अयोध्या धाम दर्शन',
    titleEn: 'Shree Ram Janmabhoomi Temple Ayodhya Tour',
    category: 'India',
    image: '/images/destinations/ayodhya.jpg',
    duration: '2 - 3 दिन',
    durationEn: '2 - 3 Days',
    location: 'Ayodhya, Uttar Pradesh',
    rating: 4.99,
    reviewsCount: 280,
    description: 'भगवान श्रीराम की जन्मस्थली पर निर्मित भव्य एवं दिव्य राम जन्मभूमि मंदिर, हनुमान गढ़ी और सरयू नदी आरती।',
    descriptionEn: 'Birthplace of Lord Ram featuring the newly constructed grand Ram Mandir, Hanuman Garhi & Saryu Aarti.',
    highlights: ['राम लला भव्य मंदिर दर्शन', 'हनुमान गढ़ी दर्शन', 'सरयू नदी संध्या आरती', 'कनक भवन एवं नागेश्वरनाथ'],
    inclusions: ['लखनऊ/अयोध्या पिकअप कार', '3-स्टार / 4-स्टार होटल', 'वीआईपी दर्शन सहायता', '24 घंटे गाइड सपोर्ट'],
    featured: true
  },
  {
    _id: 'ind_somnath',
    title: 'सोमनाथ प्रथम ज्योतिर्लिंग मंदिर (गुजरात)',
    titleEn: 'Somnath Temple First Jyotirlinga Tour',
    category: 'India',
    image: '/images/destinations/somnath.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Prabhas Patan, Gujarat',
    rating: 4.94,
    reviewsCount: 130,
    description: 'अरब सागर के तट पर स्थित भगवान शिव का पहला और अत्यंत प्राचीन सोमनाथ ज्योतिर्लिंग मंदिर।',
    descriptionEn: 'First among the 12 holy Jyotirlinga shrines of Lord Shiva situated on Arabian Sea shore.',
    highlights: ['सोमनाथ मंदिर भव्य आरती', 'लाइट एंड साउंड शो', 'त्रिवेणी संगम स्नान', 'भालका तीर्थ (श्रीकृष्ण धाम)'],
    inclusions: ['अहमदाबाद/राजकोट एसी कार', 'समुद्र तट होटल स्टे', 'टोल एवं पार्किंग शामिल', '24 घंटे सपोर्ट'],
    featured: false
  },
  {
    _id: 'ind_rameshwaram',
    title: 'श्री रामनाथस्वामी मंदिर (रामेश्वरम, तमिलनाडु)',
    titleEn: 'Rameshwaram Ramanathaswamy Temple Tour',
    category: 'India',
    image: '/images/destinations/rameshwaram.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Rameshwaram, Tamil Nadu',
    rating: 4.93,
    reviewsCount: 115,
    description: 'अपनी विश्व की सबसे लंबी अलंकृत गलियों, 22 पवित्र तीर्थ कुंडों और रामायण काल से जुड़े ऐतिहासिक महत्व हेतु प्रसिद्ध।',
    descriptionEn: 'Famous for its magnificent corridors, 22 holy Kundas, and Ramayana historic importance.',
    highlights: ['रामनाथस्वामी ज्योतिर्लिंग', '22 पवित्र कुंड स्नान', 'धनुषकोडी रामसेतु व्यू', 'डॉ. एपीजे अब्दुल कलाम मेमोरियल'],
    inclusions: ['मदुरै/रामेश्वरम कार ट्रांसफर', 'होटल स्टे', 'गाइड सहायता', 'एसी कार'],
    featured: false
  },
  {
    _id: 'ind_jagannath_puri',
    title: 'श्री जगन्नाथ मंदिर पुरी एवं कोणार्क सूर्य मंदिर',
    titleEn: 'Shree Jagannath Temple Puri & Konark Tour',
    category: 'India',
    image: '/images/destinations/jagannath_puri.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Puri, Odisha',
    rating: 4.95,
    reviewsCount: 150,
    description: 'भगवान जगन्नाथ, बलभद्र एवं सुभद्रा का पवित्र चार धाम मंदिर, प्रसिद्ध रथ यात्रा और कोणार्क सूर्य मंदिर।',
    descriptionEn: 'Sacred Char Dham shrine of Lord Jagannath famous for Rath Yatra and UNESCO Konark Sun Temple.',
    highlights: ['श्री जगन्नाथ मंदिर दर्शन', 'महाप्रसाद (56 भोग)', 'कोणार्क सूर्य मंदिर यूनेस्को', 'पुरी गोल्डन बीच'],
    inclusions: ['भुवनेश्वर/पुरी कार ट्रांसफर', 'बीच रिज़ॉर्ट स्टे', 'गाइड पास', 'एसी कार'],
    featured: true
  },
  {
    _id: 'ind_meenakshi',
    title: 'मीनाक्षी अम्मन मंदिर (मदुरै, तमिलनाडु)',
    titleEn: 'Meenakshi Amman Temple Madurai Tour',
    category: 'India',
    image: '/images/destinations/meenakshi.jpg',
    duration: '2 - 3 दिन',
    durationEn: '2 - 3 Days',
    location: 'Madurai, Tamil Nadu',
    rating: 4.91,
    reviewsCount: 92,
    description: 'द्रविड़ वास्तुकला का उत्कृष्ट नमूना, जिसमें 14 रंग-बिरंगे ऊंचे गोपुरम और 1000 स्तंभों का हॉल स्थित है।',
    descriptionEn: 'Masterpiece of Dravidian architecture featuring colorful Gopurams and 1000 Pillar Hall.',
    highlights: ['मीनाक्षी सुंदरेस्वरर मंदिर', 'हजार स्तंभ हॉल', 'तिरुमलाई नायक पैलेस', 'रात्रि पल्लकी उत्सव'],
    inclusions: ['एसी कार एवं ड्राइवर', 'होटल स्टे', 'गाइड बुकिंग', 'नाश्ता शामिल'],
    featured: false
  },
  {
    _id: 'ind_dwarkadhish',
    title: 'श्री द्वारकाधीश मंदिर (द्वारका एवं बेट द्वारका)',
    titleEn: 'Dwarkadhish Temple & Beyt Dwarka Tour',
    category: 'India',
    image: '/images/destinations/dwarkadhish.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Dwarka, Gujarat',
    rating: 4.96,
    reviewsCount: 145,
    description: 'भगवान श्रीकृष्ण की प्राचीन तटीय द्वारका नगरी, जगत मंदिर और समुद्र मार्ग से बेट द्वारका दर्शन।',
    descriptionEn: 'Coastal Char Dham kingdom of Lord Krishna featuring Jagat Mandir and Beyt Dwarka island.',
    highlights: ['द्वारकाधीश मंदिर आरती', 'बेट द्वारका नौका यात्रा', 'नागेश्वर ज्योतिर्लिंग', 'रुक्मिणी मंदिर'],
    inclusions: ['जामनगर/द्वारका एसी कार', 'होटल स्टे', 'नाव टिकट सहायता', '24 घंटे सपोर्ट'],
    featured: true
  },
  {
    _id: 'ind_khatu_shyam',
    title: 'खाटू श्याम जी मंदिर एवं सालासर बालाजी (राजस्थान)',
    titleEn: 'Khatu Shyam Ji & Salasar Balaji Tour',
    category: 'India',
    image: '/images/destinations/khatu_shyam.jpg',
    duration: '2 - 3 दिन',
    durationEn: '2 - 3 Days',
    location: 'Khatu / Sikar, Rajasthan',
    rating: 4.97,
    reviewsCount: 220,
    description: 'बर्बरीक (श्याम बाबा) को समर्पित "हारे का सहारा" खाटू श्याम जी मंदिर एवं सिद्ध सालासर हनुमान जी मंदिर।',
    descriptionEn: 'Famous shrine of Shyam Baba (Barbarik) and Salasar Hanuman Temple in Rajasthan.',
    highlights: ['खाटू श्याम जी भव्य दर्शन', 'श्याम कुंड एवं तोरण द्वार', 'सालासर बालाजी मंदिर', 'जीण माता मंदिर'],
    inclusions: ['जयपुर/सीकर एसी कार', 'होटल स्टे', 'वीआईपी लाइन गाइडेंस', 'टोल शामिल'],
    featured: true
  },
  {
    _id: 'ind_haridwar_rishikesh',
    title: 'हरिद्वार एवं ऋषिकेश गंगा आरती व योग नगरी',
    titleEn: 'Haridwar & Rishikesh Ganga Aarti Tour',
    category: 'India',
    image: '/images/destinations/haridwar.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Haridwar & Rishikesh, Uttarakhand',
    rating: 4.94,
    reviewsCount: 165,
    description: 'गंगा के तट पर बसे जुड़वां आध्यात्मिक केंद्र, हर की पौड़ी गंगा आरती, लक्ष्मण झूला एवं योग आश्रम।',
    descriptionEn: 'Twin spiritual hubs on holy Ganga famous for Har Ki Pauri Ganga Aarti, Ram Jhula & Yoga Ashrams.',
    highlights: ['हर की पौड़ी महा आरती', 'मनसा देवी एवं चंडी देवी मंदिर', 'ऋषिकेश लक्ष्मण झूला व राम झूला', 'त्रिवेणी घाट आरती'],
    inclusions: ['दिल्ली/देहरादून एसी कार', 'गंगा व्यू होटल स्टे', 'केबल कार पास', 'नाश्ता'],
    featured: false
  },
  {
    _id: 'ind_mathura_vrindavan',
    title: 'मथुरा एवं वृंदावन बांके बिहारी ब्रजभूमि दर्शन',
    titleEn: 'Mathura & Vrindavan Bankey Bihari Tour',
    category: 'India',
    image: '/images/destinations/vrindavan.jpg',
    duration: '2 - 3 दिन',
    durationEn: '2 - 3 Days',
    location: 'Mathura & Vrindavan, UP',
    rating: 4.98,
    reviewsCount: 230,
    description: 'भगवान श्रीकृष्ण की बाल लीलाओं की ब्रजभूमि, बांके बिहारी मंदिर, प्रेम मंदिर लाइट शो एवं श्री कृष्ण जन्मभूमि।',
    descriptionEn: 'Sacred Brijbhumi land of Lord Krishna, Bankey Bihari temple, Prem Mandir lighting & Janmabhoomi.',
    highlights: ['श्री बांके बिहारी मंदिर दर्शन', 'श्रीकृष्ण जन्मभूमि मथुरा', 'प्रेम मंदिर भव्य लाइट शो', 'इस्कॉन मंदिर एवं गोवर्धन परिक्रमा'],
    inclusions: ['दिल्ली/आगरा एसी कार', 'होटल स्टे', 'लोकल ई-रिक्शा सहायता', '24 घंटे सपोर्ट'],
    featured: true
  },
  {
    _id: 'ind_ajmer_sharif',
    title: 'अजमेर शरीफ दरगाह एवं पुष्कर ब्रह्मा मंदिर',
    titleEn: 'Ajmer Sharif Dargah & Pushkar Brahma Temple Tour',
    category: 'India',
    image: '/images/destinations/ajmer.jpg',
    duration: '2 - 3 दिन',
    durationEn: '2 - 3 Days',
    location: 'Ajmer & Pushkar, Rajasthan',
    rating: 4.89,
    reviewsCount: 95,
    description: 'हज़रत ख्वाजा मोइनुद्दीन चिश्ती की प्रसिद्ध सूफी दरगाह एवं पवित्र पुष्कर झील किनारे स्थित विश्व प्रसिद्ध ब्रह्मा मंदिर।',
    descriptionEn: 'Renowned Sufi shrine of Khwaja Moinuddin Chishti and rare Brahma Temple at Pushkar Lake.',
    highlights: ['अजमेर शरीफ दरगाह ज़ियारत', 'पुष्कर ब्रह्मा मंदिर एवं पवित्र झील', 'सावित्री माता पहाड़ी मंदिर', 'रंगजी मंदिर'],
    inclusions: ['जयपुर/अजमेर एसी कार', 'होटल स्टे', 'टोल एवं गाइड सहायता', '24 घंटे सपोर्ट'],
    featured: false
  },
  {
    _id: 'ind_pushkar_brahma',
    title: 'पुष्कर ब्रह्मा मंदिर एवं पवित्र पुष्कर झील',
    titleEn: 'Pushkar Sacred Lake & Brahma Temple Tour',
    category: 'India',
    image: '/images/destinations/pushkar.jpg',
    duration: '2 दिन',
    durationEn: '2 Days',
    location: 'Pushkar, Rajasthan',
    rating: 4.87,
    reviewsCount: 78,
    description: 'भगवान ब्रह्मा को समर्पित दुनिया का बहुत ही दुर्लभ मंदिर एवं पवित्र 52 घाटों से घिरी पुष्कर झील।',
    descriptionEn: 'Rare global temple dedicated to Lord Brahma situated on the ghats of sacred Pushkar Lake.',
    highlights: ['जगत्पिता ब्रह्मा मंदिर दर्शन', 'पुष्कर झील 52 घाट महापूजन', 'सावित्री देवी रोपवे', 'रेगिस्तान सफारी'],
    inclusions: ['एसी सेडान/एसयूवी कार', 'होटल स्टे', 'टोल एवं पार्किंग', '24 घंटे सपोर्ट'],
    featured: false
  },
  {
    _id: 'ind_kamakhya',
    title: 'कामाख्या माता मंदिर असम 51 शक्तिपीठ दर्शन',
    titleEn: 'Kamakhya Temple Guwahati Assam Tour',
    category: 'India',
    image: '/images/destinations/kamakhya.jpg',
    duration: '3 - 4 दिन',
    durationEn: '3 - 4 Days',
    location: 'Guwahati, Assam',
    rating: 4.95,
    reviewsCount: 110,
    description: 'नीलाचल पहाड़ियों पर स्थित सबसे प्राचीन और प्रतिष्ठित 51 शक्तिपीठों में से एक माँ कामाख्या मंदिर।',
    descriptionEn: 'One of the oldest and most revered 51 Shaktipeeth shrines situated on Nilachal Hills in Assam.',
    highlights: ['कामाख्या देवी शक्तिपीठ दर्शन', 'उमानंद मंदिर (ब्रह्मपुत्र द्वीप)', 'ब्रह्मपुत्र नदी क्रूज़', 'नवग्रह मंदिर'],
    inclusions: ['गुवाहाटी एयरपोर्ट कार', 'होटल स्टे', 'वीआईपी दर्शन पास सहायता', 'नाश्ता'],
    featured: false
  },
  {
    _id: 'ind_akshardham',
    title: 'स्वामीनारायण अक्षरधाम मंदिर (नई दिल्ली)',
    titleEn: 'Swaminarayan Akshardham Temple Delhi Tour',
    category: 'India',
    image: '/images/destinations/akshardham.jpg',
    duration: '1 - 2 दिन',
    durationEn: '1 - 2 Days',
    location: 'New Delhi',
    rating: 4.96,
    reviewsCount: 140,
    description: 'भारतीय संस्कृति, आध्यात्मिकता और प्राचीन वास्तुकला का एक आधुनिक और अद्भूत भव्य मंदिर परिसर।',
    descriptionEn: 'Modern architectural masterpiece depicting ancient Indian culture, spirituality and heritage.',
    highlights: ['अक्षरधाम मुख्य मंदिर परिसर', 'सहज आनंद वॉटर शो', 'संस्कृति विहार बोट राइड', 'नीलकंठ दर्शन हॉल'],
    inclusions: ['दिल्ली एनसीआर एसी कार', 'होटल पिकअप/ड्रॉप', 'अनुभवी ड्राइवर', 'टोल शामिल'],
    featured: false
  }
];

const Destinations = ({ lang, currency, onSelectBooking, initialCategory = 'MP', initialSearch = '' }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  const [activeTab, setActiveTab] = useState(initialCategory || 'MP');
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    if (initialCategory) setActiveTab(initialCategory);
    if (initialSearch) setSearchTerm(initialSearch);
  }, [initialCategory, initialSearch]);

  useEffect(() => {
    loadDestinations();
  }, [activeTab, searchTerm]);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const categoryParam = activeTab === 'All' ? '' : activeTab;
      const res = await fetchDestinations(categoryParam, searchTerm);
      const dataList = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      
      if (dataList.length > 0) {
        setDestinations(dataList);
      } else {
        filterFallbackDestinations(categoryParam, searchTerm);
      }
    } catch (err) {
      console.warn('API error, using local packages store:', err);
      filterFallbackDestinations(activeTab === 'All' ? '' : activeTab, searchTerm);
    } finally {
      setLoading(false);
    }
  };

  const filterFallbackDestinations = (category, query) => {
    let filtered = [...FALLBACK_DESTINATIONS];
    if (category && category !== 'All') {
      filtered = filtered.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q) ||
          (item.location && item.location.toLowerCase().includes(q))
      );
    }
    setDestinations(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDestinations();
  };

  return (
    <section id="destinations" className="py-14 sm:py-18 relative z-10 bg-slate-50">
      <span id="trips" className="relative -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Emotional & Clean */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-xs sm:text-sm font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>{isHindi ? 'पवित्र तीर्थ एवं पर्यटन' : 'SACRED & SCENIC PACKAGES'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
            {t.destTitlePrefix} <span className="text-gradient-coral">{t.destTitleHighlight}</span>
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            {t.destSubtitle}
          </p>
        </div>

        {/* Tab Switcher & Search Bar: Clean & Minimal */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Primary Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'MP', label: isHindi ? 'मध्य प्रदेश (MP)' : 'Madhya Pradesh' },
              { id: 'India', label: isHindi ? 'पवित्र भारत (India)' : 'Incredible India' },
              { id: 'All', label: isHindi ? 'सभी पैकेज' : 'All Packages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm('');
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Section Search Filter */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-200 w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={isHindi ? 'स्थान खोजें...' : 'Search places...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-semibold"
            />
          </form>

        </div>

        {/* Destination Grid: Compact, Organized Cards */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-3 text-slate-500 text-xs font-bold">मंज़िलें लोड हो रही हैं...</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {destinations.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Compact Card Image Header */}
                  <div 
                    onClick={() => setSelectedDestination(item)}
                    className="relative h-40 sm:h-44 w-full overflow-hidden cursor-pointer bg-slate-100"
                  >
                    <img
                      src={item.image}
                      alt={`${item.title} यात्रा पैकेज - इंदौर से टैक्सी | विंध्याचल ट्रेवल्स`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/destinations/varanasi.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md bg-slate-900/80 text-white backdrop-blur-md">
                        {item.category === 'MP' ? 'मध्य प्रदेश' : 'पवित्र भारत'}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-white/95 text-amber-600 border border-amber-200 shadow-sm backdrop-blur-md">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {item.rating || 4.9}
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-xs font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{isHindi ? item.duration : (item.durationEn || item.duration)}</span>
                    </div>
                  </div>

                  {/* Card Body: Compact & Organized */}
                  <div className="p-3.5 sm:p-4 space-y-2">
                    <h3 
                      onClick={() => setSelectedDestination(item)}
                      className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {isHindi ? item.title : (item.titleEn || item.title)}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="truncate">{item.location || 'India'}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 font-normal">
                      {isHindi ? item.description : (item.descriptionEn || item.description)}
                    </p>

                    {/* Subtle Amenities Line */}
                    <div className="pt-1.5 flex items-center gap-2 text-xs font-medium text-slate-600 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> एसी कार व सारथी</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-sky-700 font-semibold"><ShieldCheck className="w-3 h-3 text-sky-600 shrink-0" /> दर्शन सहायता</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Compact 2-Button Action Bar */}
                <div className="p-3.5 sm:p-4 pt-0 space-y-1.5">
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      onClick={() => onSelectBooking(item)}
                      className="col-span-3 btn-shimmer py-2 px-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{isHindi ? 'पैकेज बुक करें' : 'Book Package'}</span>
                      <ArrowRight className="w-3 h-3 stroke-[3]" />
                    </button>

                    <a
                      href={`https://wa.me/919685232340?text=नमस्ते%20विंध्याचल%20ट्रेवल्स,%20मुझे%20${encodeURIComponent(item.title)}%20टूर%20पैकेज%20की%20जानकारी%20चाहिए`}
                      target="_blank"
                      rel="noreferrer"
                      className="col-span-1 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors"
                      title="WhatsApp पर पूछें"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                    </a>
                  </div>

                  {/* View Details Link */}
                  <button
                    onClick={() => setSelectedDestination(item)}
                    className="w-full text-center text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors py-0.5 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{isHindi ? 'पूरी जानकारी एवं आकर्षण देखें' : 'View Full Details'}</span>
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Package Detail Modal Popup Dialogue */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onSelectBooking={onSelectBooking}
        currency={currency}
        lang={lang}
      />
    </section>
  );
};

export default Destinations;
