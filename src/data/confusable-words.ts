export type ConfusableCategory = 'visual' | 'semantic' | 'grammatical';

export interface ConfusableWord {
    word: string;
    meaning: string;
    example: string;
}

export interface ConfusablePair {
    id: string;
    category: ConfusableCategory;
    pair: [ConfusableWord, ConfusableWord];
    mnemonic: string;
    quiz: {
        question: string;
        answerIndex: 0 | 1; // 0 for the first word, 1 for the second
        explanation: string;
    };
}

export const confusableWordsData: ConfusablePair[] = [
    // Visual Similarity
    {
        id: 'accept-except',
        category: 'visual',
        pair: [
            {
                word: 'Accept',
                meaning: '받아들이다, 수락하다',
                example: 'Please accept my apology.'
            },
            {
                word: 'Except',
                meaning: '제외하다, ~을 빼고',
                example: 'Everyone was there except him.'
            }
        ],
        mnemonic: "Accept는 'A'ccept -> Admit (인정하다/받다), Except는 'E'xcept -> Exclude (배제하다)",
        quiz: {
            question: 'The store will ______ all major credit cards.',
            answerIndex: 0,
            explanation: '신용카드를 "받아들이다"라는 의미이므로 Accept가 적절합니다.'
        }
    },
    {
        id: 'complement-compliment',
        category: 'visual',
        pair: [
            {
                word: 'Complement',
                meaning: '보완하다, 보충물',
                example: 'This wine complements the steak perfectly.'
            },
            {
                word: 'Compliment',
                meaning: '칭찬하다, 찬사',
                example: 'He gave her a nice compliment.'
            }
        ],
        mnemonic: "Compl'e'ment는 Complet'e'(완성하다), Compl'i'ment는 'I' like it (칭찬)",
        quiz: {
            question: 'The scarf is a perfect ______ to her outfit.',
            answerIndex: 0,
            explanation: '옷차림을 "완성/보완"해주는 것이므로 Complement가 맞습니다.'
        }
    },

    // Semantic Nuance
    {
        id: 'say-tell',
        category: 'semantic',
        pair: [
            {
                word: 'Say',
                meaning: '말하다 (내용 전달 초점)',
                example: 'She said nothing to me.'
            },
            {
                word: 'Tell',
                meaning: '말하다 (대상에게 전달 초점)',
                example: 'Tell me the truth.'
            }
        ],
        mnemonic: "Say something (무언가를 말하다), Tell someone (누구에게 말하다)",
        quiz: {
            question: 'Can you ______ me what happened?',
            answerIndex: 1,
            explanation: '대상(me)에게 정보를 전달해달라는 의미이므로 Tell이 적절합니다.'
        }
    },
    {
        id: 'salary-wage',
        category: 'semantic',
        pair: [
            {
                word: 'Salary',
                meaning: '봉급 (월급/연봉, 고정급)',
                example: 'She receives an annual salary.'
            },
            {
                word: 'Wage',
                meaning: '임금 (시급/주급, 노동 대가)',
                example: 'Minimum wage has increased.'
            }
        ],
        mnemonic: "Salary는 'Sal't(소금 - 로마시대 급여), Wage는 'W'ork hours(시간당)",
        quiz: {
            question: 'The workers are demanding a higher hourly ______.',
            answerIndex: 1,
            explanation: '시간당(hourly) 급여를 의미하므로 Wage가 적절합니다.'
        }
    },

    // Grammatical Logic
    {
        id: 'rise-raise',
        category: 'grammatical',
        pair: [
            {
                word: 'Rise',
                meaning: '오르다 (자동사, 목적어 없음)',
                example: 'The sun rises in the east.'
            },
            {
                word: 'Raise',
                meaning: '올리다 (타동사, 목적어 있음)',
                example: 'Please raise your hand.'
            }
        ],
        mnemonic: "Ri's'e = Self (스스로 오름), R'a'ise = Action (행동을 가함/손을 듬)",
        quiz: {
            question: 'Inflation continues to ______.',
            answerIndex: 0,
            explanation: '목적어 없이 주어(Inflation)가 스스로 오르는 것이므로 자동사 Rise가 맞습니다.'
        }
    },
    {
        id: 'lie-lay',
        category: 'grammatical',
        pair: [
            {
                word: 'Lie',
                meaning: '눕다, 놓여있다 (자동사)',
                example: 'I need to lie down.'
            },
            {
                word: 'Lay',
                meaning: '놓다, 두다 (타동사)',
                example: 'Lay the book on the table.'
            }
        ],
        mnemonic: "Lie (자신이 눕다), Lay (대상을 놓다 - P'la'ce)",
        quiz: {
            question: 'Please ______ the blanket on the bed.',
            answerIndex: 1,
            explanation: '담요(목적어)를 놓는 것이므로 타동사 Lay가 필요합니다.'
        }
    }
];
