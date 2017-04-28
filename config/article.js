export default () => ({ // eslint-disable-line

  // link file UUID
  id: '9b87da1e-2c51-11e7-9ec8-168383da43b7',

  // canonical URL of the published page
  // https://ig.ft.com/100-days get filled in by the ./configure script
  url: 'https://ig.ft.com/100-days-in-numbers/',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2017-04-29T05:00:00Z'),

  headline: 'Trump\'s 100 days: by the numbers',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'Nine charts that show how the ' +
           '45th presidency measures up so far',

  topic: {
    name: 'Donald Trump',
    url: 'https://www.ft.com/donald-trump',
  },

  // relatedArticle: {
  //   text: 'Related article »',
  //   url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  // },

  mainImage: {
    title: '',
    description: '',
    url: '',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Lauren Leatherby', url: 'https://www.ft.com/lauren-leatherby' }
  ],

  // Appears in the HTML <title>
  title: 'Trump\'s 100 days: by the numbers',

  // meta data
  description: 'Nine charts that show how the 45th presidency measures up so far',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary_large_image',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fac18d062-2c3e-11e7-bc4b-5528796fe35c.img?source=ig&width=1200',
  socialHeadline: 'Donald Trump’s first 100 days',
  socialSummary:  'Donald Trump’s first 100 days: 9 charts that show how his presidency measures up so far',

  // TWITTER
  twitterImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fac18d062-2c3e-11e7-bc4b-5528796fe35c.img?source=ig&width=1200',
  // twitterCreator: '@individual's_account',
  tweetText:  'Donald Trump’s first 100 days: 9 charts that show how his presidency measures up so far',
  twitterHeadline:  'Donald Trump’s first 100 days',

  // FACEBOOK
  facebookImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fac18d062-2c3e-11e7-bc4b-5528796fe35c.img?source=ig&width=1200',
  facebookHeadline: 'Donald Trump’s first 100 days',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
