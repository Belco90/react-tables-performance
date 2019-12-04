### Demo:

http://stingy-deer.surge.sh/

### Features

- You have two buttons for fetching small or large data set whenever you
  want!
- You can switch between "regular" render or virtualized render. ⚠️
  **Note that when disabling virtualized render the page will freeze a
  few seconds because of the huge amount of elements from the data set
  that will be rendered!**
- Sort any column (only once at a time) by clicking in the column head
  to sort asc, sort desc and remove sort
- Filter by titles on the fly

### Dependencies

- `react-scripts`: this is Create React App, the quickest and easiest way of starting a new React project
- `react-window`: for virtualizing the table as it would be too heavy to
  render the whole large data set when we only need to render what the
  user can see in the viewport (you can check this yourself when
  toggling the "Use virtualization" option)
- `prettier`: just for autoformatting the code
- `husky` and `lint-staged`: for autoformatting the code when committing
  changes
- `prop-types`: include props info for React components
- `lodash`: I only want some utils from lodash but they recommend to
  install the whole package (and it was already in the project as a
  dependency of babel). I'm using orderBy util for sorting.
- `classnames`: util for merging different classNames in a component
  under different conditions

### Technical decisions

- **Showing ellipsis for each cell when content doesn't fit**: to avoid
  rows too high I'm fixing a narrow value and then hiding overflow
  content with an ellipsis so you can see more rows at the same time. I
  assumed it's more important to be able to see several rows than see
  the full info about each cell as that could imply just seeing 3 or 4
  at the same time. You are still able to see the full content by
  hovering the mouse in a particular cell with content (through title
  attribute).
- **Fixing table and rows height**: these two have been fixed because of
  the virtualization as the height of the table and the rows must be
  known. I could have play around with dynamic row heights but I think
  is out of the scope of the test. Additionally, having a table height
  fixed will help to see the rows while not loosing the heads and action
  buttons.
- **Non-responsive table**: as mentioned in the test description, this
  table is not supposed to work on mobile or being responsive, so I just
  made sure it works fine with a viewport greater than 992px, which
  bootstrap and other UI framework consider as the minimum width for
  desktops. Anyway, the columns widths are fixed with percentages so it
  will look better in wider screens.
- **Custom table elements**: I didn't use the HTML `table` element
  because of the limitation from virtualizing the list (responsiveness
  wouldn't be a problem with table tag from the previous point), so I
  made my custom table layout with divs elements and flex styling. I
  could have used some UI framework for it but it was a simple layout so
  I coded it myself.
- **Filtering**: Really simple for this one as I just filter by checking
  if the title includes the value the user entered and then keep the
  filtered movies as a draft in a temporary state so the sorting can be
  applied later. Here I'm doing insensitive comparison and trimming the
  strings.
- **Sorting**: I'm relying on lodash.orderBy for this and the sorting
  process is quite fast so the table is rendered sorted almost
  instantly. The sort is always executed over the filtered movies list
  but the performance is really good anyway. There are still some edge
  cases to address for strings with whitespaces at the beginning or
  removing special characters at the start of the values. Ideally I
  would delegate this to corresponding API but obviously that's not
  possible for this test.

### Improvements

- Sanitize fields for sorting: ignoring weird chars and whitespaces at
  the beginning, apply insensitive comparison, etc
- Handle fetch errors
- Apply debouncing while user type on filter title input so table do the
  filtering when user has stopped writing (500ms for example) and we
  avoid weird re-renders
- Extract filtering and sorting process into its own hook
