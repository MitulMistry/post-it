class TagsController < ApplicationController
  before_action :find_tag, only: [:show, :update, :destroy]

  #uses ActiveModel Serializer to implicitly serialize tag (render json: @tag), in serializers/tag_serializer.rb
  def index
    @tags = current_user.tags
    #render json: @tags
    respond_to do |format|
     #format.html { render :index }
     format.json { render json: @tags}
   end
  end

  def show
    respond_to do |format|
     #format.html { render :show }
     format.json { render json: @tag}
   end
  end

  def create
    @tag = current_user.tags.create(tag_params)
    render json: @tag
  end

  def update
    @tag.update(tag_params)
  end

  def destroy
    @tag.destroy
  end

  #--------------------
  private

  def find_tag
    @tag = Tag.find(params[:id])
  end

  def tag_params #strong params
    params.require(:tag).permit(:name)
  end
end
