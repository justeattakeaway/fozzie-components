import evaluateRestriction from '../src/evaluateRestriction';

function expectTrue(restriction, context){
  expect(evaluateRestriction(restriction, context)).toBe(true);
}

function expectFalse(restriction, context){
  expect(evaluateRestriction(restriction, context)).toBe(false);
}

describe('Equality checks', () => {
    it('eq true', () => {   
      expectTrue({
          eq: 'uk',
          property: 'Country'
        }, {
          country: 'uk'
        });        
    });

    it('eq false', () => {
      expectFalse({
        eq: 'uk', 
        property: 'Country'
      }, {
        country: 'es'
      })
    });

    it('eq true case-insensitive', () => {   
      expectTrue({
          eq: 'UK',
          property: 'Country'
        }, {
          country: 'uk'
        });        
    });

    it('neq true', () => {   
      expectTrue({
          neq: 'uk',
          property: 'Country'
        }, {
          country: 'es'
        });        
    });

    it('neq false', () => {
      expectFalse({
        neq: 'uk', 
        property: 'Country'
      }, {
        country: 'uk'
      })
    });

    it('in true', () => {   
      expectTrue({
          in: ['uk', 'au'],
          property: 'Country'
        }, {
          country: 'uk'
        });        
    });

    it('in false', () => {
      expectFalse({
        in: ['uk', 'au'], 
        property: 'Country'
      }, {
        country: 'es'
      })
    });

    it('nin true', () => {   
      expectTrue({
          nin: ['uk', 'au'],
          property: 'Country'
        }, {
          country: 'es'
        });        
    });

    it('nin false', () => {
      expectFalse({
        nin: ['uk', 'au'], 
        property: 'Country'
      }, {
        country: 'au'
      })
    });
    
});

describe('Comparison checks', () => {
  it('gt true', () => {   
    expectTrue({
        gt: '1.1',
        property: 'AppVersion'
      }, {
        appVersion: '1.2'
      });        
  });

  it('gt true (because of extra .0)', () => {
    expectTrue({
      gt: '1.1',
      property: 'AppVersion'
    }, {
      appVersion: '1.1.0'
    });        
  });

  it('gt false (lt)', () => {
    expectFalse({
      gt: '1.1', 
      property: 'AppVersion'
    }, {
      appVersion: '1.0'
    })
  });

  it('gt false (equal)', () => {
    expectFalse({
      gt: '1.1', 
      property: 'AppVersion'
    }, {
      appVersion: '1.1'
    })
  });

  it('gte true (gt)', () => {   
    expectTrue({
        gte: '1.1',
        property: 'AppVersion'
      }, {
        appVersion: '1.2'
      });        
  });

  it('gte true (eq)', () => {   
    expectTrue({
        gte: '1.1',
        property: 'AppVersion'
      }, {
        appVersion: '1.1'
      });        
  });

  it('gte false', () => {
    expectFalse({
      gte: '1.1', 
      property: 'AppVersion'
    }, {
      appVersion: '1.0'
    })
  });

  it('lt true', () => {   
    expectTrue({
        lt: '1.1',
        property: 'AppVersion'
      }, {
        appVersion: '1.0'
      });        
  });

  it('lt true (because of extra .0)', () => {
    expectTrue({
      lt: '1.1.0',
      property: 'AppVersion'
    }, {
      appVersion: '1.1'
    });        
  });

  it('lt false (gt)', () => {
    expectFalse({
      lt: '1.1', 
      property: 'AppVersion'
    }, {
      appVersion: '1.2'
    })
  });

  it('lt false (equal)', () => {
    expectFalse({
      lt: '1.1', 
      property: 'AppVersion'
    }, {
      appVersion: '1.1'
    })
  });

  it('lte true (lt)', () => {   
    expectTrue({
        lte: '1.1',
        property: 'AppVersion'
      }, {
        appVersion: '1.0'
      });        
  });

  it('lte true (eq)', () => {   
    expectTrue({
        lte: '1.1',
        property: 'AppVersion'
      }, {
        appVersion: '1.1'
      });        
  });

  it('lte false', () => {
    expectFalse({
      lte: '1.1', 
      property: 'AppVersion'
    }, {
      appVersion: '1.2'
    })
  });

  it('gt only 1 part to version true', () => {
    expectTrue({
      gt: '1',
      property: 'AppVersion'
    }, {
      appVersion: '2'
    })
  });
  
  it('gt only 1 part to version false', () => {
    expectFalse({
      gt: '1',
      property: 'AppVersion'
    }, {
      appVersion: '1'
    })
  });

  it('gt many parts to version true', () => {
    expectTrue({
      gt: '1.2.3.4.5.1212',
      property: 'AppVersion'
    }, {
      appVersion: '1.2.3.4.5.1213'
    })
  });

  it('gt many parts to version false', () => {
    expectFalse({
      gt: '1.2.3.4.5.1212',
      property: 'AppVersion'
    }, {
      appVersion: '1.2.3.4.3'
    })
  });

});


describe('And / or checks', () => {
  it('and true', () => {   
    expectTrue({
      and: [
        {
          eq: 'uk',
          property: 'Country'
        },
        {
          eq: '1.2',
          property: 'AppVersion'
        }
      ]
    }, {
        country: 'uk',
        appVersion: '1.2'
      });        
  });

  it('and false', () => {   
    expectFalse({
      and: [
        {
          eq: 'uk',
          property: 'Country'
        },
        {
          eq: '1.2',
          property: 'AppVersion'
        }
      ]
    }, {
        country: 'uk',
        appVersion: '1.2.3'
      });        
  });

  it('or true', () => {   
    expectTrue({
      or: [
        {
          eq: 'uk',
          property: 'Country'
        },
        {
          eq: '1.2',
          property: 'AppVersion'
        }
      ]
    }, {
        country: 'uk',
        appVersion: '1.2.1'
      });        
  });

  it('or false', () => {   
    expectFalse({
      or: [
        {
          eq: 'uk',
          property: 'Country'
        },
        {
          eq: '1.2',
          property: 'AppVersion'
        }
      ]
    }, {
        country: 'es',
        appVersion: '1.2.3'
      });        
  });  
});

describe('Nested restrictions', () => {

  const nestedRestrictions = {
    or: [
      {
        and: [
          {
            in: ['uk', 'es'],
            property: 'Country'
          },
          {
            or: [
              {
                gt: '3.1',
                property: 'AppVersion'
              },
              {
                lt: '1.9.2',
                property: 'AppVersion'
              }
            ]
          }
        ]
      },
      {
        eq: 'au',
        property: 'Country'
      }
    ]
  };

  it('Nested check 1', () => {
    expectTrue(nestedRestrictions, {
      country: 'au',
      appVersion: '2.0'
    });
  });

  it('Nested check 2', () => {
    expectTrue(nestedRestrictions, {
      country: 'uk',
      appVersion: '1.9'
    });
  });

  it('Nested check 2', () => {
    expectFalse(nestedRestrictions, {
      country: 'uk',
      appVersion: '2.0'
    });
  });
});

describe('Empty restrictions', () => {
  it('returns true', () => {
    expectTrue({}, {
      country: 'uk',
      appVersion: '1.2'
    })
  })
})


describe('Dodgy settings', () => {
  it('Bad restriction property returns false', () => {
    expectFalse({
      eq: 'xyz',
      property: 'Blah'
    }, {
      country: 'uk',
      appVersion: '1.2'
    })
  });

  it('Comparison on country returns false', () => {
    expectFalse({
      lt: 'xyz',
      property: 'Country'
    }, {
      country: 'uk',
      appVersion: '1.2'
    })
  });

})