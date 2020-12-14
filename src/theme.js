export const theme = {
  "name": "my theme",
  "rounding": 2,
  "spacing": 20,
  "defaultMode": "light",
  "global": {
    "colors": {
      "brand": {
        "dark": "#0466C8",
        "light": "#053c5E"
      },
      "background": {
        "dark": "BEFFC7",
        "light": "#F6F8F2"
      },
      "background-back": {
        "dark": "a9d8b8",
        "light": "#BCC2C7"
      },
      "background-front": {
        "dark": "A7C4B5",
        "light": "#A2BAA1"
      },
      "background-contrast": {
        "dark": "BEFFC7",
        "light": "#C4C2AB"
      },
      "text": {
        "dark": "#EEEEEE",
        "light": "#333533"
      },
      "text-strong": {
        "dark": "#FFFFFF",
        "light": "#242423"
      },
      "text-weak": {
        "dark": "72705b",
        "light": "#484847"
      },
      "text-xweak": {
        "dark": "9b9982",
        "light": "#464946"
      },
      "border": {
        "dark": "#444444",
        "light": "#B9CAC2"
      },
      "control": "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "focus": {
        "light": "background",
        "dark": "background"
      },
      "graph-1": "background-back"
    },
    "font": {
      "family": "\"Cabin\"",
      "size": "15px",
      "height": "20px",
      "maxWidth": "300px",
      "face": "/* vietnamese */\n@font-face {\n  font-family: 'Cabin';\n  font-style: normal;\n  font-weight: 400;\n  font-stretch: 100%;\n  src: url(https://fonts.gstatic.com/s/cabin/v17/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkV2EH7mlwUzuA_q9BtS8.woff) format('woff');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Cabin';\n  font-style: normal;\n  font-weight: 400;\n  font-stretch: 100%;\n  src: url(https://fonts.gstatic.com/s/cabin/v17/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkV2EH7ilwUzuA_q9BtS8.woff) format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Cabin';\n  font-style: normal;\n  font-weight: 400;\n  font-stretch: 100%;\n  src: url(https://fonts.gstatic.com/s/cabin/v17/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkV2EH7alwUzuA_q9Bg.woff) format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n"
    },
    "active": {
      "background": "active-background",
      "color": "active-text"
    },
    "hover": {
      "background": "active-background",
      "color": "active-text"
    },
    "selected": {
      "background": "selected-background",
      "color": "selected-text"
    },
    "control": {
      "border": {
        "radius": "2px"
      }
    },
    "drop": {
      "border": {
        "radius": "2px"
      }
    },
    "borderSize": {
      "xsmall": "1px",
      "small": "2px",
      "medium": "3px",
      "large": "10px",
      "xlarge": "20px"
    },
    "breakpoints": {
      "small": {
        "value": 640,
        "borderSize": {
          "xsmall": "1px",
          "small": "2px",
          "medium": "3px",
          "large": "5px",
          "xlarge": "10px"
        },
        "edgeSize": {
          "none": "0px",
          "hair": "1px",
          "xxsmall": "2px",
          "xsmall": "3px",
          "small": "5px",
          "medium": "10px",
          "large": "20px",
          "xlarge": "40px"
        },
        "size": {
          "xxsmall": "20px",
          "xsmall": "40px",
          "small": "80px",
          "medium": "160px",
          "large": "320px",
          "xlarge": "640px",
          "full": "100%"
        }
      },
      "medium": {
        "value": 1280
      },
      "large": {}
    },
    "edgeSize": {
      "none": "0px",
      "hair": "1px",
      "xxsmall": "3px",
      "xsmall": "5px",
      "small": "10px",
      "medium": "20px",
      "large": "40px",
      "xlarge": "80px",
      "responsiveBreakpoint": "small"
    },
    "input": {
      "padding": "10px",
      "weight": 600
    },
    "spacing": "20px",
    "size": {
      "xxsmall": "40px",
      "xsmall": "80px",
      "small": "160px",
      "medium": "320px",
      "large": "640px",
      "xlarge": "960px",
      "xxlarge": "1280px",
      "full": "100%"
    }
  },
  "chart": {},
  "diagram": {
    "line": {}
  },
  "meter": {},
  "layer": {
    "background": {
      "dark": "#111111",
      "light": "#FFFFFF"
    }
  },
  "button": {
    "border": {
      "width": "2px",
      "radius": "2px"
    },
    "padding": {
      "vertical": "3px",
      "horizontal": "18px"
    }
  },
  "checkBox": {
    "check": {
      "radius": "2px"
    },
    "toggle": {
      "radius": "2px",
      "size": "40px"
    },
    "size": "20px"
  },
  "radioButton": {
    "size": "20px",
    "check": {
      "radius": "2px"
    }
  },
  "formField": {
    "border": {
      "color": "border",
      "error": {
        "color": {
          "dark": "white",
          "light": "status-critical"
        }
      },
      "position": "inner",
      "side": "bottom",
      "style": "solid",
      "size": "xsmall"
    },
    "content": {
      "pad": "small"
    },
    "disabled": {
      "background": {
        "color": "status-disabled",
        "opacity": "medium"
      }
    },
    "error": {
      "color": "status-critical",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "help": {
      "color": "dark-3",
      "margin": {
        "start": "small"
      }
    },
    "info": {
      "color": "text-xweak",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "label": {
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "margin": {
      "bottom": "small"
    },
    "round": "2px"
  },
  "calendar": {
    "small": {
      "fontSize": "11.666666666666666px",
      "lineHeight": 1.375,
      "daySize": "22.86px"
    },
    "medium": {
      "fontSize": "15px",
      "lineHeight": 1.45,
      "daySize": "45.71px"
    },
    "large": {
      "fontSize": "25px",
      "lineHeight": 1.11,
      "daySize": "91.43px"
    }
  },
  "clock": {
    "analog": {
      "hour": {
        "width": "7px",
        "size": "20px"
      },
      "minute": {
        "width": "3px",
        "size": "10px"
      },
      "second": {
        "width": "3px",
        "size": "8px"
      },
      "size": {
        "small": "60px",
        "medium": "80px",
        "large": "120px",
        "xlarge": "180px",
        "huge": "240px"
      }
    },
    "digital": {
      "text": {
        "xsmall": {
          "size": "8.333333333333332px",
          "height": 1.5
        },
        "small": {
          "size": "11.666666666666666px",
          "height": 1.43
        },
        "medium": {
          "size": "15px",
          "height": 1.375
        },
        "large": {
          "size": "18.333333333333332px",
          "height": 1.167
        },
        "xlarge": {
          "size": "21.666666666666668px",
          "height": 1.1875
        },
        "xxlarge": {
          "size": "28.333333333333336px",
          "height": 1.125
        }
      }
    }
  },
  "heading": {
    "level": {
      "1": {
        "small": {
          "size": "28px",
          "height": "33px",
          "maxWidth": "567px"
        },
        "medium": {
          "size": "42px",
          "height": "47px",
          "maxWidth": "833px"
        },
        "large": {
          "size": "68px",
          "height": "73px",
          "maxWidth": "1367px"
        },
        "xlarge": {
          "size": "95px",
          "height": "100px",
          "maxWidth": "1900px"
        }
      },
      "2": {
        "small": {
          "size": "25px",
          "height": "30px",
          "maxWidth": "500px"
        },
        "medium": {
          "size": "35px",
          "height": "40px",
          "maxWidth": "700px"
        },
        "large": {
          "size": "45px",
          "height": "50px",
          "maxWidth": "900px"
        },
        "xlarge": {
          "size": "55px",
          "height": "60px",
          "maxWidth": "1100px"
        }
      },
      "3": {
        "small": {
          "size": "22px",
          "height": "27px",
          "maxWidth": "433px"
        },
        "medium": {
          "size": "28px",
          "height": "33px",
          "maxWidth": "567px"
        },
        "large": {
          "size": "35px",
          "height": "40px",
          "maxWidth": "700px"
        },
        "xlarge": {
          "size": "42px",
          "height": "47px",
          "maxWidth": "833px"
        }
      },
      "4": {
        "small": {
          "size": "18px",
          "height": "23px",
          "maxWidth": "367px"
        },
        "medium": {
          "size": "22px",
          "height": "27px",
          "maxWidth": "433px"
        },
        "large": {
          "size": "25px",
          "height": "30px",
          "maxWidth": "500px"
        },
        "xlarge": {
          "size": "28px",
          "height": "33px",
          "maxWidth": "567px"
        }
      },
      "5": {
        "small": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "267px"
        },
        "medium": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "267px"
        },
        "large": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "267px"
        },
        "xlarge": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "267px"
        }
      },
      "6": {
        "small": {
          "size": "12px",
          "height": "17px",
          "maxWidth": "233px"
        },
        "medium": {
          "size": "12px",
          "height": "17px",
          "maxWidth": "233px"
        },
        "large": {
          "size": "12px",
          "height": "17px",
          "maxWidth": "233px"
        },
        "xlarge": {
          "size": "12px",
          "height": "17px",
          "maxWidth": "233px"
        }
      }
    },
    "font": {
      "family": "\"PT Sans\""
    }
  },
  "paragraph": {
    "small": {
      "size": "13px",
      "height": "18px",
      "maxWidth": "267px"
    },
    "medium": {
      "size": "15px",
      "height": "20px",
      "maxWidth": "300px"
    },
    "large": {
      "size": "18px",
      "height": "23px",
      "maxWidth": "367px"
    },
    "xlarge": {
      "size": "22px",
      "height": "27px",
      "maxWidth": "433px"
    },
    "xxlarge": {
      "size": "28px",
      "height": "33px",
      "maxWidth": "567px"
    }
  },
  "text": {
    "xsmall": {
      "size": "12px",
      "height": "17px",
      "maxWidth": "233px"
    },
    "small": {
      "size": "13px",
      "height": "18px",
      "maxWidth": "267px"
    },
    "medium": {
      "size": "15px",
      "height": "20px",
      "maxWidth": "300px"
    },
    "large": {
      "size": "18px",
      "height": "23px",
      "maxWidth": "367px"
    },
    "xlarge": {
      "size": "22px",
      "height": "27px",
      "maxWidth": "433px"
    },
    "xxlarge": {
      "size": "28px",
      "height": "33px",
      "maxWidth": "567px"
    }
  },
  "scale": 1,
  "email": "travis1000@icloud.com",
  "date": "2020-12-12T11:46:19.000Z"
}

