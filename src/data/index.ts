export interface Data {
  id: string
  deckName: string
  items: {
    word: string
    translation: string
  }[]
}

export const IMAGE_PATH = `/assets/img/`
export const AUDIO_PATH = `/assets/audio/`

export const dataArray: Data[] = [
  {
    id: 'action-a',
    deckName: 'Action (set A)',
    items: [
      { word: 'cry', translation: 'плакать' },
      { word: 'dance', translation: 'танцевать' },
      { word: 'dive', translation: 'нырять' },
      { word: 'draw', translation: 'рисовать' },
      { word: 'fish', translation: 'ловить рыбу' },
      { word: 'fly', translation: 'летать' },
      { word: 'hug', translation: 'обнимать' },
      { word: 'jump', translation: 'прыгать' },
    ],
  },
  {
    id: 'action-b',
    deckName: 'Action (set B)',
    items: [
      { word: 'open', translation: 'открывать' },
      { word: 'play', translation: 'играть' },
      { word: 'point', translation: 'указывать' },
      { word: 'ride', translation: 'ездить' },
      { word: 'run', translation: 'бегать' },
      { word: 'sing', translation: 'петь' },
      { word: 'skip', translation: 'пропускать, прыгать' },
      { word: 'swim', translation: 'плавать' },
    ],
  },
  {
    id: 'action-c',
    deckName: 'Action (set C)',
    items: [
      { word: 'listen', translation: 'слушать' },
      { word: 'lose', translation: 'проиграть, потерять' },
      { word: 'read', translation: 'читать' },
      { word: 'stand up', translation: 'встать' },
      { word: 'sit down', translation: 'сесть' },
      { word: 'win', translation: 'выиграть' },
      { word: 'write', translation: 'писать' },
      { word: 'yell', translation: 'кричать' },
    ],
  },
  {
    id: 'animal-a',
    deckName: 'Animal (set A)',
    items: [
      { word: 'cat', translation: 'кот' },
      { word: 'chick', translation: 'цыплёнок' },
      { word: 'chicken', translation: 'курица' },
      { word: 'dog', translation: 'собака' },
      { word: 'horse', translation: 'лошадь' },
      { word: 'pig', translation: 'свинья' },
      { word: 'rabbit', translation: 'кролик' },
      { word: 'sheep', translation: 'овца' },
    ],
  },
  {
    id: 'animal-b',
    deckName: 'Animal (set B)',
    items: [
      { word: 'bird', translation: 'птица' },
      { word: 'frog', translation: 'жаба' },
      { word: 'giraffe', translation: 'жираф' },
      { word: 'lion', translation: 'лев' },
      { word: 'mouse', translation: 'мышь' },
      { word: 'turtle', translation: 'черепаха' },
      { word: 'dolphin', translation: 'дельфин' },
      { word: 'raccoon', translation: 'енот' },
    ],
  },
  {
    id: 'animal-с',
    deckName: 'Animal (set C)',
    items: [
      { word: 'bull', translation: 'бык' },
      { word: 'cock', translation: 'петух' },
      { word: 'cow', translation: 'корова' },
      { word: 'goose', translation: 'гусь' },
      { word: 'monkey', translation: 'обезьяна' },
      { word: 'swan', translation: 'лебедь' },
      { word: 'tiger', translation: 'тигр' },
      { word: 'whale', translation: 'кит' },
    ],
  },
  {
    id: 'clothes',
    deckName: 'Clothes',
    items: [
      { word: 'skirt', translation: 'юбка' },
      { word: 'pants', translation: 'брюки' },
      { word: 'blouse', translation: 'блузка' },
      { word: 'dress', translation: 'платье' },
      { word: 'boot', translation: 'ботинок' },
      { word: 'shirt', translation: 'рубашка' },
      { word: 'coat', translation: 'пальто' },
      { word: 'shoe', translation: 'туфли' },
    ],
  },
  {
    id: 'emotions',
    deckName: 'Emotions',
    items: [
      { word: 'sad', translation: 'грустный' },
      { word: 'angry', translation: 'сердитый' },
      { word: 'happy', translation: 'счастливый' },
      { word: 'tired', translation: 'уставший' },
      { word: 'surprised', translation: 'удивлённый' },
      { word: 'scared', translation: 'испуганный' },
      { word: 'smile', translation: 'улыбка' },
      { word: 'laugh', translation: 'смех' },
    ],
  },
]
