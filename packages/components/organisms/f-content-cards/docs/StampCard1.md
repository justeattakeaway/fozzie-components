# StampCard1

The `StampCard1` component supports the following keys of the `card` prop, with these meanings:

* `title` - `String`

  This is rendered as the title of the card, and is normally the name of the restaurant
  that the stamp card relates to.

* `subtitle` - `String`

  A human-readable description of the 'status' of the card.

* `description` - `String[]`

  An array of strings that provide further information about the card if necessary.

* `image` - `String`

  A URL giving a logo of the related restaurant

* `url` - `String`

  A URL to the menu of the related restaurant for the customers' ongoing journey

* `isReadyToClaim` - `Boolean`

  An indication of whether the stamps status should be rendered

* `discountPercentage` - `Number`

  A value (currently disregarded) for future support of alternate percentage offer amounts

* `earnedStamps` - `Number`

  A value giving the number of stamps the customer has earned

* `totalRequiredStamps` - `Number`

  A value (currently disregarded) of the number of stamps required to earn money off a
  subsequent order

* `expiryDate` - `String`

  A date in ISO8601 format - currently disregarded

* `expiryLine` - `String`

  A human-readable description of the above date and how it relates to the card content

