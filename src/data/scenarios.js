// Texas Criminal Trial Advocacy Game - Scenarios

export const scenarios = [
  {
    id: "scenario_001",
    offenseLevel: "class_c",
    offenseType: "assault",
    topic: "hearsay",
    difficulty: 1,

    context: {
      defendant: "Maria Rodriguez",
      charge: "Class C Assault",
      background: "You represent Maria Rodriguez, charged with Class C assault stemming from an altercation at a grocery store. The complaining witness, Kevin Thompson, claims Maria shoved him during an argument over a parking space."
    },

    situation: {
      phase: "trial",
      moment: "direct_examination",
      description: "The prosecutor is conducting direct examination of Kevin Thompson's friend, Sarah Mills, who was not present during the alleged assault. The prosecutor asks: 'Ms. Mills, what did Kevin tell you happened in the parking lot that day?'"
    },

    options: [
      {
        id: "opt_a",
        text: "Object - Hearsay",
        correct: true,
        explanation: "Correct. This is classic hearsay under Texas Rule of Evidence 801(d). Sarah is being asked to testify about an out-of-court statement (what Kevin told her) offered to prove the truth of the matter asserted (that Maria assaulted Kevin). Kevin's statement to Sarah is hearsay unless it falls under an exception, and the State hasn't laid a predicate for any exception.",
        ruleCitation: "Tex. R. Evid. 801(d), 802"
      },
      {
        id: "opt_b",
        text: "Object - Lack of Personal Knowledge",
        correct: false,
        explanation: "While Sarah Mills lacks personal knowledge of the assault itself (she wasn't there), the current question asks what Kevin told her, which she does have personal knowledge of. The primary problem is hearsay, not lack of personal knowledge. Rule 602 requires personal knowledge of the facts testified to, but Sarah does have personal knowledge of the conversation.",
        ruleCitation: "Tex. R. Evid. 602"
      },
      {
        id: "opt_c",
        text: "Object - Relevance",
        correct: false,
        explanation: "The evidence is actually highly relevant to the State's case - if admissible, it would directly support their theory that Maria assaulted Kevin. Rule 401 defines relevant evidence as having any tendency to make a consequential fact more or less probable. The problem here is not relevance, but rather that the evidence is hearsay.",
        ruleCitation: "Tex. R. Evid. 401"
      },
      {
        id: "opt_d",
        text: "No objection - let it in",
        correct: false,
        explanation: "Incorrect. Allowing this hearsay testimony would be a significant strategic error. Not only is it inadmissible under the rules, but it also allows the State to present Kevin's version of events without Kevin being subject to your cross-examination on this specific statement. Always object to inadmissible evidence, especially when it's harmful to your client.",
        ruleCitation: null
      }
    ],

    timerSeconds: 20,

    successMessage: "Well done! You properly identified and objected to inadmissible hearsay. In trial, you must be ready to spot hearsay instantly and object before the witness answers.",

    failureMessage: "The objection was not sustained or you missed the hearsay issue. Remember: hearsay is an out-of-court statement offered for the truth of the matter asserted. When a witness testifies about what someone else said, ask yourself: is this being offered to prove what that person said is true?"
  },

  {
    id: "scenario_002",
    offenseLevel: "class_c",
    offenseType: "theft",
    topic: "leading_questions",
    difficulty: 1,

    context: {
      defendant: "James Park",
      charge: "Class C Theft",
      background: "You represent James Park, accused of stealing a $45 phone charger from a convenience store. The store clerk is the State's key witness."
    },

    situation: {
      phase: "trial",
      moment: "direct_examination",
      description: "The prosecutor is conducting direct examination of the store clerk, Amanda Chen. The prosecutor asks: 'Ms. Chen, the defendant took the charger and left without paying, didn't he?'"
    },

    options: [
      {
        id: "opt_a",
        text: "Object - Leading",
        correct: true,
        explanation: "Correct. This is a leading question on direct examination. Rule 611(c) prohibits leading questions on direct examination except in limited circumstances (hostile witnesses, preliminary matters, etc.). The question suggests the answer ('didn't he?') rather than allowing the witness to testify in her own words. On direct, the prosecutor should ask 'What did you observe?' not 'He did X, didn't he?'",
        ruleCitation: "Tex. R. Evid. 611(c)"
      },
      {
        id: "opt_b",
        text: "Object - Lack of Foundation",
        correct: false,
        explanation: "While foundation could potentially be an issue if the prosecutor hasn't established that Ms. Chen was present and could observe the defendant, the immediate problem is that this is a leading question. Lack of foundation objections address whether proper predicate has been laid for the evidence, but here the form of the question itself is improper.",
        ruleCitation: "Tex. R. Evid. 602"
      },
      {
        id: "opt_c",
        text: "Object - Hearsay",
        correct: false,
        explanation: "This is not hearsay. The prosecutor is asking Ms. Chen to testify about her own observations, not about an out-of-court statement made by someone else. Hearsay involves reporting what someone else said; here, Ms. Chen is being asked what she herself saw. The problem is that the question is leading, not that it's hearsay.",
        ruleCitation: "Tex. R. Evid. 801"
      },
      {
        id: "opt_d",
        text: "No objection",
        correct: false,
        explanation: "Incorrect. You should object to this leading question. Not only is it improper under Rule 611(c), but leading questions on direct allow the lawyer to testify instead of the witness. They're particularly harmful because they put words in the witness's mouth. Always object to leading questions on direct examination - make the State prove its case through proper questioning.",
        ruleCitation: null
      }
    ],

    timerSeconds: 18,

    successMessage: "Excellent! You caught the leading question. In direct examination, the witness should tell the story, not the lawyer. Make the State follow the rules.",

    failureMessage: "The judge allowed the leading question. On direct examination, watch for questions that suggest their own answer - those are leading and improper under Rule 611(c)."
  }
];

export default scenarios;
