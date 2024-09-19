Competitive Programming Learning
========================

With MarkdownPreview
---------------

  [![Build][github-ci-image]][github-ci-link]
  [![Package Control Downloads][pc-image]][pc-link]
  ![License][license-image]



# C++


```
#define FAST ios_base::sync_with_stdio(false), cin.tie(0),cout.tie(0);
//endl flushes output and forces data being written to disk. And this can significantly slow your program if you are doing this a lot.
#define endl "\n"
```


## Vector

### Initializze the vector

#### Initializing the vector of specific size.
```
vector<int> v(map.size());
```
#### Initiliaze 2D vector
```
vector<vector<int>> vec(10, vector<int>(10, 100));
```
This will create a vector of 10 vectors of size 10 and with elements initialized to 100.

### Sort the vector
```
sort(v.begin(), v.end());
sort(begin(v), end(v));
```
Both <code>v.begin()</code> and <code>begin(v)</code> represent the same iterator pointing to the beginning of the vector.

and <code>v.end()</code> and <code>end(v)</code> represent the same iterator pointing to the end of the vector. 

So, the sorting operation in both cases will work in an identical manner. It's mostly a matter of personal preference which one you choose to use.


#### Sort vector in descending order
```
sort(v.begin(),v.end(),greater<int>());
```

#### Sort 2D vector - function
```
bool compare(vector<int>& v1, vector<int>& v2) {
    return v1[0] < v2[0];
}

sort(meetings.begin(), meetings.end(), compare);
```

#### Sort 2D vector - lambda
```
sort(begin(arr),end(arr),[](string &s1, string &s2){return s1+s2>s2+s1;});
```
Custom Comparator <code>([](string &s1, string &s2) { return s1 + s2 > s2 + s1; }):</code> This is a lambda function used as the comparison criterion for sorting.

It determines the order of two strings (<code>s1</code> and <code>s2</code>) based on their concatenated results.

Comparison: The lambda function returns <code>true</code> if <code>s1 + s2</code> is greater than <code>s2 + s1</code>. This means that <code>s1</code> should come before <code>s2</code> in the sorted order if concatenating <code>s1</code> with <code>s2</code> gives a larger number than concatenating <code>s2</code> with <code>s1</code>.

#### Sort the vector of pair
```
bool sort_by_first_if_then_second(const pair<string,int>&a,const pair<string,int>&b){
    if(a.second==b.second)return (a.first<b.first);
    return (a.second>b.second);
}

vector<pair<string,int>> v;
sort(v.begin(),v.end(),sort_by_first_if_then_second);
```

#### Sort the vector of pair using template
```
template <typename T1, typename T2>
struct less_second {
    typedef pair<T1, T2> type;
    bool operator ()(type const& a, type const& b) const {
        return a.second > b.second;
    }
};

sort(mapcopy.begin(), mapcopy.end(), less_second<char, int>());
```


## map

### Initializing the map 
```
map<int,int> mp;
```

### Insert Values into map
```
for(int i=0;i<n;++i)
    mp[arr[i]]++;
```
Unfortunately the semantics of operator[] are such that if the value does not exist, it will be created on the fly.

You probably didn't even want to access a non-existent field in the map and you are asking whether it is always initialized to zero so that you can use this fact to check whether the element was there.

For this purpose however, you should either use the find() or at() member function.

### Access only value
```
for(auto [_,i]:mp)v.push_back(i);
```
in the hashmap, we stored the value of number: key-value pair. However, in the array, we are just interested in frequency because that's what we will be sorting and then using subsequently. 

<code>auto[_, freq]</code> will split the iterator into two, <code> _ </code> which points to the number or the key in the hashmap, and <code>freq</code> which points to the frequency of the number or the value in the hashmap.


# Python

## list comprehension

The return value is a new list, leaving the old list unchanged.

newlist = [expression for item in iterable if condition == True]

split string into chunks

```

str = 'Welcome to Python Examples'
n = 5

chunks = []

# using list comperhension

chunks = [str[i:i+n] for i in range(0, len(str), n)]

# Normal way to split string by character length


i = 0
while i < len(str):
    if i+n < len(str):
        chunks.append(str[i:i+n])
    else:
        chunks.append(str[i:len(str)])
    i += n
print(chunks)


```










  [bps10]: https://github.com/bps10
  [gfm-api]: https://developer.github.com/v3/markdown/
  [glfm-api]: https://docs.gitlab.com/ee/api/markdown.html
  [hexatrope]: https://github.com/hexatrope
  [home]: https://github.com/revolunet/sublimetext-markdown-preview
  [hozaka]: https://github.com/hozaka
  [hadisfr]: https://github.com/hadisfr
  [issue]: https://github.com/facelessuser/MarkdownPreview/issues
  [license]: http://revolunet.mit-license.org
  [live-reload]: https://packagecontrol.io/packages/LiveReload
  [pymd]: https://github.com/Python-Markdown/markdown
  [pymdownx-docs]: http://facelessuser.github.io/pymdown-extensions/usage_notes/
  [tommi]: https://github.com/tommi
  [github-ci-image]: https://github.com/facelessuser/MarkdownPreview/workflows/build/badge.svg
  [github-ci-link]: https://github.com/facelessuser/MarkdownPreview/actions?workflow=build
  [pc-image]: https://img.shields.io/packagecontrol/dt/MarkdownPreview.svg?logo=sublime%20text&logoColor=cccccc
  [pc-link]: https://packagecontrol.io/packages/MarkdownPreview
  [license-image]: https://img.shields.io/badge/license-MIT-blue.svg




