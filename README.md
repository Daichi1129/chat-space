# README

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false , unique:true , index|
|email|string|null: false|
|pass|string|null: false|

### Association
- has_many :groups , through:members
- has_many :messages
- has_many :members



## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users , through:members
- has_many :messages
- has_many :members


