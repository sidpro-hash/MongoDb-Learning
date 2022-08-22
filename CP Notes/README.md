Competitive Programming Learning
========================

With MarkdownPreview
---------------

  [![Build][github-ci-image]][github-ci-link]
  [![Package Control Downloads][pc-image]][pc-link]
  ![License][license-image]


```
#define FAST ios_base::sync_with_stdio(false), cin.tie(0),cout.tie(0);
//endl flushes output and forces data being written to disk. And this can significantly slow your program if you are doing this a lot.
#define endl "\n"
```


## Vector

### Initializing the vector of specific size.
```
vector<int> v(map.size());
```

### Sort the vector in descending order
```
sort(v.begin(),v.end(),greater<int>());
```

### Sort the vector of pair
```
bool sort_by_first_if_then_second(const pair<string,int>&a,const pair<string,int>&b){
    if(a.second==b.second)return (a.first<b.first);
    return (a.second>b.second);
}

vector<pair<string,int>> v;

for(int i=0;i<n;++i){
        cin>>s;
        cin>>k;
        v.push_back(make_pair(s,k));
}

sort(v.begin(),v.end(),sort_by_first_if_then_second);
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




