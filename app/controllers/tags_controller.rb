class TagsController < ApplicationController
  before_action :find_tag, only: [:show, :update, :destroy]
  before_action :authorize_ownership, only: [:show, :update, :destroy] #:edit,

  #uses ActiveModel Serializer to implicitly serialize tag (render json: @tag), in serializers/tag_serializer.rb
  def index
    @tags = current_user.tags.order("name ASC")
    render json: @tags
  end

  def show #returns all the notes that are under this tag
    @tag_notes = @tag.notes.order('created_at DESC')
    render json: @tag_notes
  end

  def create
    @tag = current_user.tags.build(tag_params)

    if @tag.save
      render json: @tag
    else
      redirect_to root_path, alert: 'Tag creation failed.'
    end
  end

  def update
    if @tag.update(tag_params)
      render nothing: true #don't render or redirect since this will be called via ajax
    else
      redirect_to root_path, alert: 'Tag update failed.'
    end
  end

  def destroy
    @tag.destroy
    render nothing: true #don't render or redirect since this will be called via ajax
  end

  #--------------------
  private

  def find_tag
    @tag = Tag.find(params[:id])
  end

  def authorize_ownership
    if @tag.user != current_user
      redirect_to root_path, alert: 'You do not have required permissions.'
    end
  end

  def tag_params #strong params
    params.require(:tag).permit(:name)
  end
end
